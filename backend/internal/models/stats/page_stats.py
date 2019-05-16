from django.contrib.postgres.fields import ArrayField
from django.db import models

from internal.models.item import Item
from internal.models.offers import Ad
from internal.models.users import Business
from internal.models.stats import Stats


class PageStats(Stats):
    """ Abstract class for Page wide stats """

    num_clicks = models.IntegerField()

    # TODO: Need to be moved to own tables.
    source_ip = ArrayField(models.CharField(max_length=100))
    source_location = ArrayField(models.CharField(max_length=300))

    class Meta:
        abstract = True


class BusinessPageStats(PageStats):
    """ Page wide stats for a business """

    business = models.OneToOneField(Business, on_delete=models.CASCADE)


class ItemPageStats(PageStats):
    """ Page wide stats for an Item """

    item = models.OneToOneField(Item, on_delete=models.CASCADE)


class AdPageStats(PageStats):
    """ Page wide stats for an Ad"""

    ad = models.OneToOneField(Ad, on_delete=models.CASCADE)
