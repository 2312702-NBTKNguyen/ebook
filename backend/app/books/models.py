from django.db import models
from django.conf import settings
from taggit.managers import TaggableManager

# Create your models here.
class Book(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    cover_Image_url = models.URLField(blank=True)
    file_Url = models.URLField(blank=True)
    page_Count = models.IntegerField(null=True, blank=True)
    language = models.CharField(max_length=50, blank=True)
    view_Count = models.IntegerField(default=0)
    download_Count = models.IntegerField(default=0)
    uploader_Id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_At = models.DateTimeField(auto_now_add=True)
    updated_At = models.DateTimeField(auto_now=True)
    
    
