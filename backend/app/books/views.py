from rest_framework import viewsets, permissions, filters
# from rest_framework.response import Response
from .models import Book, Category, Author, BookMark
from .serializers import BookSerializer, CategorySerializer, AuthorSerializer, BookMarkSerializer
from .permissions import IsAdminOrReadOnly, IsBookmarkOwner

class AuthorViewSet(viewsets.ModelViewSet):
    # API Endpoints cho Tác giả.
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [IsAdminOrReadOnly]

class CategoryViewSet(viewsets.ModelViewSet):
    # API Endpoints cho Thể loại.
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    permission_classes = [IsAdminOrReadOnly]

class BookViewSet(viewsets.ModelViewSet):
    # API Endpoints cho Sách.
    serializer_class = BookSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    # Cấu hình tìm kiếm và sắp xếp
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'authors__name', 'categories__name', 'tags__name']
    ordering_fields = ['created_at', 'view_count', 'download_count']

    def get_queryset(self):
        queryset = Book.objects.select_related('uploader').prefetch_related('categories', 'authors', 'tags').all()
        
        # Lọc theo tag nếu có tham số ?tag=...
        tag = self.request.query_params.get('tag', None)
        if tag is not None:
            queryset = queryset.filter(tags__name=tag)
        
        # Lọc theo category nếu có tham số ?category=...
        category_slug = self.request.query_params.get('category', None)
        if category_slug is not None:
            queryset = queryset.filter(categories__slug=category_slug)
        
        return queryset.distinct() # Tránh trùng lặp do join nhiều bảng
    
    def perform_create(self, serializer):
        # Gán người đăng sách là user hiện tại khi tạo mới sách
        serializer.save(uploader=self.request.user)

class BookMarkViewSet(viewsets.ModelViewSet):
    # API Endpoints cho tính năng Lưu sách (Tủ sách cá nhân).
    serializer_class = BookMarkSerializer

    # Chỉ cho phép người dùng đã đăng nhập truy cập và thao tác với bookmarks của mình
    permission_classes = [permissions.IsAuthenticated, IsBookmarkOwner]

    def get_queryset(self):
        # Chỉ trả về bookmarks của user hiện tại
        return BookMark.objects.filter(user=self.request.user).select_related('book')
    
    def perform_create(self, serializer):
        # Gán user hiện tại khi tạo mới bookmark
        serializer.save(user=self.request.user)