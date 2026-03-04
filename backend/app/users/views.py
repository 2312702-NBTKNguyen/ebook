from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegisterSerializer

User = get_user_model()

# Create your views here.
class RegisterView(generics.CreateAPIView):
    # API đăng ký người dùng mới
    queryset = User.objects.all()

    serializer_class = RegisterSerializer   
    permission_classes = [permissions.AllowAny]

class UserProfileView(generics.RetrieveUpdateAPIView):
    # API lấy thông tin (GET) và cập nhật (PUT/PATCH) profile của người dùng.
    serializer_class = UserSerializer

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Trả về đối tượng User hiện tại đang đăng nhập
        return self.request.user