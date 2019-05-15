from django.db import models


class Stats(models.Model):
    """ Parent of all stats models """

    id = models.IntegerField(primary_key=True)

    class Meta:
        abstract = True
