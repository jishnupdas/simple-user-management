from rest_framework import serializers
from rest_framework_simplejwt import serializers as jwt_serializers
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.tokens import RefreshToken

from .models import AppUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        exclude = [
            "password",
            "is_superuser",
            "groups",
            "user_permissions",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def to_representation(self, user):
        representation = super().to_representation(user)
        if user.is_superuser:
            representation["is_superuser"] = True
        return representation


class TokenObtainPairSerializer(jwt_serializers.TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Custom claims
        token["name"] = user.username

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data.update(
            {
                "refresh": f"{refresh}",
                "refresh_expires": refresh["exp"],
                "access": f"{refresh.access_token}",
                "access_expires": refresh.access_token["exp"],
            }
        )
        return data


class TokenRefreshSerializer(serializers.Serializer):
    def get_token_from_request(self):
        data = self.initial_data
        return data["refresh_token"]

    def validate(self, attrs):
        token = self.get_token_from_request()
        if token is None:
            raise serializers.ValidationError("No valid refresh token found")
        refresh = RefreshToken(token)

        data = {
            "access": f"{refresh.access_token}",
            "access_expires": refresh.access_token["exp"],
        }

        # blacklist acces token once refresh is done
        if jwt_settings.BLACKLIST_AFTER_ROTATION:
            try:
                # Attempt to blacklist the given refresh token
                refresh.blacklist()
            except AttributeError:
                # If blacklist app not installed, `blacklist` method will
                # not be present
                pass

        refresh.set_jti()
        refresh.set_exp()

        data.update(
            {
                "refresh": f"{refresh}",
                "refresh_expires": refresh["exp"],
            }
        )

        return data
