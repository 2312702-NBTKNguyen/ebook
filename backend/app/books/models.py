from django.db import models
from django.conf import settings
from taggit.managers import TaggableManager

# Create your models here.
class Author(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False)
    biography = models.TextField(blank=True, null=True)
    profile_image_url = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True, null=False)
    slug = models.SlugField(max_length=255, unique=True, null=False)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

class Book(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=False)
    slug = models.SlugField(max_length=255, unique=True, null=False)
    description = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='books/covers/', null=True, blank=True)
    file = models.FileField(upload_to='books/files/')

    # Optional fields
    page_count = models.IntegerField(null=True, blank=True, default=0)
    language = models.CharField(max_length=50, blank=True)
    view_count = models.IntegerField(default=0)
    download_count = models.IntegerField(default=0)
    
    # Foreign keys
    uploader = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='uploaded_books')
    categories = models.ManyToManyField(Category, related_name='books', blank=True)
    authors = models.ManyToManyField(Author, related_name='books', blank=True)

    # Tags
    tags = TaggableManager(blank=True)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
        
    def __str__(self):
        return self.title

class BookMark(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookmarks')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='bookmark_by_users')
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Ensure a user can bookmark a specific book only once
        constraints = [
            models.UniqueConstraint(fields=['user', 'book'], name='unique_bookmark_per_user_per_book')
        ]
        verbose_name = 'Bookmark'
        verbose_name_plural = 'Bookmarks'
        

    def __str__(self):
        return f"{self.user.username} marked {self.book.title}"

