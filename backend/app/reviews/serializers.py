from rest_framework import serializers
from django.db import IntegrityError
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)
    book_title = serializers.CharField(source="book.title", read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "book",
            "book_title",
            "user",
            "rating",
            "comment",
            "created_at",
        ]
        read_only_fields = ["user", "created_at", "book_title"]
             
    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError(
                {"detail": "Bạn đã đánh giá cuốn sách này rồi."})