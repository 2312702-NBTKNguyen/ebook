from rest_framework import serializers
from .models import Book, Category, Author, BookMark
from taggit.models import Tag

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'biography']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class TagLinkSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    class Meta:
        model = Tag
        fields = ["name", "url"]
    def get_url(self, obj):
        request = self.context.get("request")
        return f"{request.build_absolute_uri('/api/v1/books/')}?tag={obj.name}"

class BookSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    authors = AuthorSerializer(many=True, read_only=True)

    uploader = serializers.CharField(source='uploader.username', read_only=True)

    tags = serializers.SlugRelatedField(many=True, queryset=Tag.objects.all(), slug_field='name', required=False)

    tag_links = TagLinkSerializer(source="tags", many=True, read_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'slug', 'description', 'cover_image_url', 'file_url', 
                  'page_count', 'language', 'view_count', 'download_count', 'uploader', 
                  'categories', 'authors', 'tags', 'tag_links', 'created_at']
        
class BookMarkSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)
    book_slug = serializers.CharField(source='book.slug', read_only=True)

    class Meta:
        model = BookMark
        fields = ['id', 'user', 'book', 'book_title', 'book_slug', 'saved_at']
        read_only_fields = ['user', 'book_title', 'book_slug', 'saved_at']