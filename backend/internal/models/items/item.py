import uuid
from django.contrib.postgres.fields import JSONField
from django.db import models
from internal.models import Business


class Item(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100)
    owner = models.ForeignKey(Business, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="item/images/")
    description = models.TextField()
    price = models.FloatField()
    available = models.BooleanField()
    hidden = models.BooleanField()
    # TODO: change it to tags
    tags = models.TextField()


class Victual(Item):
    """ Represents model for food and drink items """

    max_price = models.FloatField()
    portion_prices_combos = JSONField()
    addon_price_combos = JSONField()