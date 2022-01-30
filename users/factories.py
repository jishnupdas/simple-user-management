import factory
from factory.django import DjangoModelFactory
from faker.providers import phone_number

from .models import AppUser


# Defining a factory
class UserFactory(DjangoModelFactory):
    class Meta:
        model = AppUser

    username = factory.Faker("user_name")
    password = factory.Faker("word")
    phone = factory.Faker("phone_number")
    email = factory.Faker("safe_email")
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
