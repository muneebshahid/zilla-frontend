from django.db import models
from backend.internal.models.users import Business


class Item(models.Model):
    id = models.IntegerField(primary_key=True)
    owner = models.ForeignKey(Business, on_delete=models.CASCADE)
