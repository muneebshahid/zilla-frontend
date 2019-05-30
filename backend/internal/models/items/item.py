""" Models for items """
import uuid
from django.contrib.postgres.fields import JSONField
from django.db import models
from internal.models import Business
from django.utils.text import slugify


class Item(models.Model):
    """ Conceret Django model for Item"""

    TYPES = ((0, "Item"), (1, "Vicutal"))
    item = models.AutoField(primary_key=True)
    title = models.CharField(max_length=500)
    slug = models.SlugField(max_length=500)
    owner = models.ForeignKey(Business, on_delete=models.CASCADE, related_name="items")
    image = models.ImageField(upload_to="item/images/")
    description = models.TextField()
    price = models.FloatField()
    available = models.BooleanField()
    hidden = models.BooleanField()
    # TODO: change it to tags
    tags = models.TextField()
    item_type = models.IntegerField(choices=TYPES, default=1)

    # Only to get rid of linting errors.
    objects = models.Manager()

    def save(self, *args, **kwargs):
        """ Compute slug and pass on to the parent class """
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Victual(Item):
    """ Represents model for food and drink items """

    max_price = models.FloatField()
    portion_prices_combos = JSONField()
    addon_price_combos = JSONField()
