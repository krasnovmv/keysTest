from django.db import models
from django.utils import timezone


class Chat(models.Model):
    id = models.AutoField(primary_key=True)
    users = models.ManyToManyField('auth.User')

    def publish(self):
        self.save()

    def __str__(self):
        return 'Чат #{}'.format(self.id)


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    chat = models.ForeignKey('chat.Chat', null=True)
    sender = models.ForeignKey('auth.User', null=True)
    message = models.TextField()
    date = models.DateTimeField(default=timezone.now)

    def publish(self):
        self.save()

    def __str__(self):
        return 'От {} в чат "{}": {}'.format(self.sender, self.chat, self.message)
