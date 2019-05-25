from django.db import models
from django.contrib.auth.models import AbstractUser


class SiteUser(AbstractUser):
    is_business = models.BooleanField(default=False)


class Business(models.Model):
    user = models.OneToOneField(
        SiteUser, on_delete=models.CASCADE, related_name="business"
    )
    website = models.CharField(max_length=200)
    address = models.TextField()
    claimed = models.BooleanField()

    def is_open(self):
        raise NotImplementedError("Needs to be implemented")
