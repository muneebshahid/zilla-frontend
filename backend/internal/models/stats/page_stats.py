from django.db import models
from backend.internal.models.stats.stats import Stats


class PageStats(Stats):
    """ Abstract class for Page wide stats """

    num_clicks = models.IntegerField()

    class Meta:
        abstract = True
