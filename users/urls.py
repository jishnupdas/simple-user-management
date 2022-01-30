# from django.conf.urls import url
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import jwt_views, views

app_name = "users"

urlpatterns = [
    path("token/", jwt_views.Login.as_view(), name="token"),
    path("token/refresh/", jwt_views.RefreshToken.as_view(), name="token-refresh"),
    path("logout/", jwt_views.Logout.as_view(), name="logout"),
]


# The API URLs are now determined automatically by the router.
router = DefaultRouter()
router.register(r"", views.UserViewSet)

urlpatterns += [
    path("", include(router.urls)),
]
