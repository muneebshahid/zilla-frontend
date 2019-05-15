from django.db import models
from backend.internal.models.users import Client
from backend.internal.models.stats.stats import Stats


class StatsPerUser(Stats):
    """ Abstract class for Page wide stats """

    review = models.TextField()
    score = models.FloatField()
    like = models.BooleanField()
    user = models.ForeignKey(Client, on_delete=models.CASCADE)

    class Meta:
        abstract = True
