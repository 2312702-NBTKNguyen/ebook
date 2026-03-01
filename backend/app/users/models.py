from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    class Roles(models.TextChoices):
        ADMIN = 'admin', 'Quản trị viên'
        READER = 'reader', 'Người đọc'
        UPLOADER = 'uploader', 'Người đăng sách'

    email = models.EmailField(unique=True, null=False)
    avatar_url = models.URLField(blank=True)
    role = models.CharField(max_length=50, choices=Roles.choices, default=Roles.READER)

    def __str__(self):
        return self.username