from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import AppUser


@admin.register(AppUser)
class AppUserAdmin(UserAdmin):

    list_display = (
        "username",
        "first_name",
        "last_name",
        "email",
        "phone",
        "last_login",
        "is_superuser",
        "is_staff",
        "is_active",
    )
    list_filter = (
        "last_login",
        "is_superuser",
        "is_staff",
        "is_active",
        "date_joined",
    )
    search_fields = ["id", "username", "phone"]
    fieldsets = UserAdmin.fieldsets + (
        (
            "Additional Info",
            {
                "description": "User details",
                "fields": ("phone",),
            },
        ),
    )


admin.site.site_header = "User management"
admin.site.index_title = "User management administration"
