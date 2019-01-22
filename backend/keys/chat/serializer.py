from django.contrib.auth.models import User
from rest_framework import serializers

from keys.chat.models import Chat, Message


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class ChatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'users')


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'sender', 'message', 'date')
        depth = 2
