from django.db import models
from internal.models.item import Item
from internal.models.users import Client, Business
from internal.models.stats import Stats


class StatsPerUser(Stats):
    """ Abstract class for stats by user """

    review = models.TextField()
    score = models.FloatField()
    like = models.BooleanField()
    user = models.ForeignKey(Client, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class UserStatsPerItem(StatsPerUser):
    """ User stats for an Item """

    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    tried = models.BooleanField()

    class Meta:
        unique_together = ("user", "item")


class UserStatsPerBusiness(StatsPerUser):
    """ User stats for a Business """

    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    checkin = models.BooleanField()

    class Meta:
        unique_together = ("user", "business")
