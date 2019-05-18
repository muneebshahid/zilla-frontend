import uuid
from django.contrib.postgres.fields import JSONField
from django.db import models
from internal.models.users import Business


class PortionSize(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    size = models.CharField(max_length=50)


class Item(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    owner = models.ForeignKey(Business, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="")
    description = models.TextField()
    min_price = models.FloatField()
    max_price = models.FloatField()
    available = models.BooleanField()
    hidden = models.BooleanField()
    # TODO: change it to tags
    tags = models.TextField()
    portion_size = models.ManyToManyField(PortionSize)
    portion_prices = JSONField()
    addon_price_combos = JSONField()
