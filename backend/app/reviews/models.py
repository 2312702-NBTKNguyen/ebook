from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from app.books.models import Book

# Create your models here.
class Review(models.Model):
    id = models.AutoField(primary_key=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')

    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], null=False)
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Ensure a user can only leave one review per book
        constraints = [
            models.UniqueConstraint(fields=['book', 'user'], name='unique_review_per_user_per_book')
        ]
    
    def __str__(self):
        return f"Review {self.id} for Book {self.book.title} by User {self.user.username}"
