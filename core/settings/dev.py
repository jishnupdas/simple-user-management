import factory

from .base import *

factory.Faker._DEFAULT_LOCALE = "en_IN"

SHELL_PLUS = "ipython"

INTERNAL_IPS = [
    "127.0.0.1",
    "localhost",
]

INSTALLED_APPS += [
    "debug_toolbar",
]

# MIDDLEWARE = [
#     "debug_toolbar.middleware.DebugToolbarMiddleware",
# ]

CORS_ORIGIN_ALLOW_ALL = True
