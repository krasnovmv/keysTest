from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import jwt_payload_handler, jwt_encode_handler

from keys.chat.models import Chat, Message
from keys.chat.serializer import UserSerializer, MessageSerializer


def get_chat_by_users(users):
    chat = Chat.objects.distinct()
    for user in users:
        chat = chat.filter(users=user)
    if chat.count():
        chat_id = chat[0].id
    else:
        new_chat = Chat()
        new_chat.save()
        new_chat.users.add(*users)
        new_chat.save()
        chat_id = new_chat.id
    return chat_id


class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = User.objects.filter(~Q(username=user)).order_by('-date_joined')
        return queryset


class UserRegistration(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = User.objects.create(**serializer.validated_data)
            user.set_password(data['password'])
            user.save()
            payload = jwt_payload_handler(user)
            token = {'token': jwt_encode_handler(payload)}
            return Response(token, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Неправильный запрос',
            'message': 'Учетная запись не может быть создана с полученными данными'
        }, status=status.HTTP_400_BAD_REQUEST)


class ChatViewSet(viewsets.ModelViewSet):
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = MessageSerializer

    def get_queryset(self):
        user = self.request.user.id
        chat_user = self.kwargs['chat_user']
        chat = get_chat_by_users([user, chat_user])
        queryset = Message.objects.filter(chat_id=chat).order_by('date')
        return queryset

    def create(self, request, *args, **kwargs):
        user = self.request.user.id
        chat_user = self.kwargs['chat_user']
        chat = get_chat_by_users([user, chat_user])
        data = request.data
        data['sender'] = user
        data['chat'] = chat
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            new_message = Message.objects.create(**serializer.validated_data)
            new_message.sender_id = data['sender']
            new_message.chat_id = data['chat']
            new_message.save()
            data = MessageSerializer(new_message)
            return Response(data.data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Неправильный запрос',
            'message': 'Сообщение не может быть создано с полученными данными'
        }, status=status.HTTP_400_BAD_REQUEST)
