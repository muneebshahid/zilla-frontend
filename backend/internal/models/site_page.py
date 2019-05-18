from django.db import models


class SitePage(models.Model):
    """ List of pages contained on our website """

    id = models.IntegerField(primary_key=True)
    url = models.URLField()
