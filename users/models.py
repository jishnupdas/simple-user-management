from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class AppUser(AbstractUser):
    """
    Custom User model
    """

    role_choices = [
        ("user", "User"),
        ("admin", "Admin"),
    ]
    phone = models.CharField(
        verbose_name=_("Phone number"),
        help_text=_("Phone number of user"),
        max_length=20,
        blank=True,
        null=True,
    )
    role = models.CharField(
        verbose_name=_("Role"),
        help_text=_("Role of the user. eg User, admin, staff, etc"),
        max_length=100,
        choices=role_choices,
        default="user",
    )

    def __str__(self):
        return f"{self.username}-{self.role}"

    class Meta:
        ordering = ("-id",)
        verbose_name = "User"
        verbose_name_plural = "Users"
