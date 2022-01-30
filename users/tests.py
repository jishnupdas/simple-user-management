import factory
from django.test import TestCase
from factory.django import DjangoModelFactory

from .factories import UserFactory
from .models import AppUser


class AppUserTest(TestCase):
    def setUp(self):
        self.data = UserFactory(
            username="username",
            password="X5j13$#e",
            phone="7894561234",
            email="any_email@example.com",
            first_name="Firstname",
            last_name="Lastname",
        )

    def test_with_factory_boy(self):

        self.assertTrue(isinstance(self.data, AppUser))
        self.assertEqual(self.data.username, "username")
        self.assertEqual(self.data.password, "X5j13$#e")
        self.assertEqual(self.data.phone, "7894561234")
        self.assertEqual(self.data.email, "any_email@example.com")
        self.assertEqual(self.data.first_name, "Firstname")
        self.assertEqual(self.data.last_name, "Lastname")
