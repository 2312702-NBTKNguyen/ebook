# Router tổng hợp các endpoint thuộc API v1.
from django.urls import path, include
from app.books.views import BookViewSet, CategoryViewSet, AuthorViewSet, BookMarkViewSet
from rest_framework.routers import DefaultRouter
from app.reviews.views import ReviewViewSet

router = DefaultRouter()

router.register(r'books', BookViewSet, basename='book')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'authors', AuthorViewSet, basename='author')
router.register(r'bookmarks', BookMarkViewSet, basename='bookmark')
router.register(r"reviews", ReviewViewSet, basename="review")

urlpatterns = [
    path("", include(router.urls)),
    path('auth/', include('app.users.urls')),
]