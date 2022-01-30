import factory
from django.test import TestCase
from factory.django import DjangoModelFactory
from rest_framework.test import APITestCase

from .factories import UserFactory
from .models import AppUser


class AppUserTest(TestCase):
    def setUp(self):
        self.user = UserFactory(
            username="username",
            password="X5j13$#e",
            phone="7894561234",
            role="admin",
            email="any_email@example.com",
            first_name="Firstname",
            last_name="Lastname",
        )
        self.user2 = UserFactory(username="user2")

    def test_with_factory_boy(self):

        self.assertTrue(isinstance(self.user, AppUser))
        self.assertEqual(self.user.username, "username")
        self.assertEqual(self.user.password, "X5j13$#e")
        self.assertEqual(self.user.phone, "7894561234")
        self.assertEqual(self.user.role, "admin")
        self.assertEqual(self.user.email, "any_email@example.com")
        self.assertEqual(self.user.first_name, "Firstname")
        self.assertEqual(self.user.last_name, "Lastname")

    def test_models_query(self):
        self.assertEqual(AppUser.objects.all().count(), 2)


class UserAPITest(APITestCase):
    """
    Test different endpoints in userAPI
    """

    def setUp(self):

        self.user1 = UserFactory(username="user1")
        self.user2 = UserFactory(username="user2")

    def test_list_url(self):
        response = self.client.get("/api/users/", format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 2)

    def test_create_user(self):
        self.client.force_authenticate(user=self.user1)
        data = {
            "username": "username",
            "password": "X5j13$#e",
            "phone": "7894561234",
            "role": "admin",
            "email": "any_email@example.com",
            "first_name": "Firstname",
            "last_name": "Lastname",
            "is_staff": True,
            "is_active": True,
        }

        response = self.client.post("/api/users/", data, format="json")
        self.assertEqual(response.status_code, 201)

        response = self.client.get("/api/users/", format="json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 3)
        self.assertEqual(response.data["count"], 3)

    def test_patch_user(self):
        self.client.force_authenticate(user=self.user1)
        data = {
            "username": "user001",
            "role": "user",
            "is_staff": True,
            "is_active": True,
        }

        response = self.client.patch(
            f"/api/users/{self.user1.id}/", data, format="json"
        )
        self.assertEqual(response.status_code, 200)

    def test_delete_user(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.delete(f"/api/users/{self.user1.id}/")
        self.assertEqual(response.status_code, 204)


class AuthenticationAPI(APITestCase):
    """
    Test the user authentication and token blacklisting
    """

    def setUp(self):

        self.user1 = UserFactory(username="user1")
        self.user1.set_password("pass@1234")
        self.user1.save()
        self.user2 = UserFactory(username="user2")
        self.user2.set_password("pass@1234")
        self.user2.save()

        self.data = {
            "username": "user1",
            "password": "pass@1234",
        }

    def test_login_url(self):
        response = self.client.post("/api/users/token/", self.data, format="json")
        self.assertEqual(response.status_code, 200)
        token = response.data["refresh"]

        response = self.client.post(
            "/api/users/token/refresh/", data={"refresh_token": token}, format="json"
        )
        self.assertEqual(response.status_code, 200)

    def test_logout_url(self):

        response = self.client.post("/api/users/token/", self.data, format="json")
        self.assertEqual(response.status_code, 200)
        token = response.data["refresh"]

        response = self.client.post(
            "/api/users/logout/", data={"refresh_token": token}, format="json"
        )
        self.assertEqual(response.status_code, 200)

        response = self.client.post(
            "/api/users/token/refresh/", data={"refresh_token": token}, format="json"
        )
        self.assertEqual(response.status_code, 401)
