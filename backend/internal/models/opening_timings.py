import uuid
from django.contrib.postgres.fields import ArrayField
from django.db import models


from internal.models import Business


class OpeningTimings(models.Model):
    """ Opening Timings for businesses """

    id = models.AutoField(primary_key=True)
    business = models.ForeignKey(
        Business, on_delete=models.CASCADE, related_name="timings"
    )
    monday_open = models.TimeField()
    monday_close = models.TimeField()
    tuesday_open = models.TimeField()
    tuesday_close = models.TimeField()
    wednesday_open = models.TimeField()
    wednesday_close = models.TimeField()
    thursday_open = models.TimeField()
    thursday_close = models.TimeField()
    friday_open = models.TimeField()
    friday_close = models.TimeField()
    saturday_open = models.TimeField()
    saturday_close = models.TimeField()
    sunday_open = models.TimeField()
    sunday_close = models.TimeField()
