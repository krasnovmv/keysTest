from django.conf.urls import url, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from keys.chat import views

router = routers.DefaultRouter()
router.register(r'auth/registration', views.UserRegistration, base_name='registration')
router.register(r'users', views.UserViewSet)
router.register(r'chat/(?P<chat_user>\d{0,10})', views.ChatViewSet, base_name='chat')

urlpatterns = [
    url('', include(router.urls)),

    url('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^auth/obtain_token/', obtain_jwt_token),
    url(r'^auth/refresh_token/', refresh_jwt_token),
]
