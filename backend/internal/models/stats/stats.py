from django.db import models
import uuid


class Stats(models.Model):
    """ Parent of all stats models """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4)

    class Meta:
        abstract = True
