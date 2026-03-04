from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UserProfileView

urlpatterns = [
    # API Đăng ký
    path('register/', RegisterView.as_view(), name='auth_register'),
    
    # API Đăng nhập
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # API Cấp lại Token
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # API Thông tin cá nhân
    path('profile/', UserProfileView.as_view(), name='user_profile'),
]