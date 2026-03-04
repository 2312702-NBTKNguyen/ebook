from rest_framework import serializers
from .models import Book, Category, Author, BookMark
from taggit.models import Tag
from urllib.parse import quote_plus

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
        relative = f"/api/v1/books/?tag={quote_plus(obj.name)}"

        if request is None:
            return relative

        return request.build_absolute_uri(relative)

    

class BookSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    authors = AuthorSerializer(many=True, read_only=True)
    uploader = serializers.CharField(source='uploader.username', read_only=True)
    tag_links = TagLinkSerializer(source="tags", many=True, read_only=True)

    tags = serializers.SlugRelatedField(
        many=True, queryset=Tag.objects.all(), 
        slug_field='name', required=False)
    
    category_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Category.objects.all(),
        write_only=True, required=False, source='categories'
    )
    author_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Author.objects.all(),
        write_only=True, required=False, source='authors'
    )

    class Meta:
        model = Book
        fields = ['id', 'title', 'slug', 'description', 'cover_image_url', 'file_url', 
                  'page_count', 'language', 'view_count', 'download_count', 'uploader', 
                  'categories', 'authors', 'tags', 'tag_links', 'created_at', 
                  'category_ids', 'author_ids']
    
    def create(self, validated_data):
        tags = validated_data.pop('tags', [])
        categories = validated_data.pop('categories', [])
        authors = validated_data.pop('authors', [])

        book = Book.objects.create(**validated_data)

        if tags:
            book.tags.set(*[t.name for t in tags])
        if categories:
            book.categories.set(categories)
        if authors:
            book.authors.set(authors)

        return book
    
    def update(self, instance, validated_data):
        tags = validated_data.pop('tags', None)
        categories = validated_data.pop('categories', None)
        authors = validated_data.pop('authors', None)

        instance = super().update(instance, validated_data)

        if tags is not None:
            instance.tags.set(*[t.name for t in tags])
        if categories is not None:
            instance.categories.set(categories)
        if authors is not None:
            instance.authors.set(authors)

        return instance


class BookMarkSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)
    book_slug = serializers.CharField(source='book.slug', read_only=True)

    class Meta:
        model = BookMark
        fields = ['id', 'user', 'book', 'book_title', 'book_slug', 'saved_at']
        read_only_fields = ['user', 'book_title', 'book_slug', 'saved_at']