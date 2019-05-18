import uuid
from django.contrib.postgres.fields import ArrayField
from django.db import models


from internal.models import Business


class OpeningTimings:
    """ Opening Timings for businesses """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    monday = ArrayField(models.TimeField())
    tuesday = ArrayField(models.TimeField())
    wednesday = ArrayField(models.TimeField())
    thursday = ArrayField(models.TimeField())
    friday = ArrayField(models.TimeField())
    saturday = ArrayField(models.TimeField())
    sunday = ArrayField(models.TimeField())
