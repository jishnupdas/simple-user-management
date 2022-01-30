from rest_framework import generics, mixins, permissions, viewsets

from .models import AppUser
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for profile details
    """

    model = AppUser
    queryset = AppUser.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (IsAuthenticated)
