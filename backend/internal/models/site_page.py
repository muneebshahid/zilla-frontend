import uuid
from django.db import models


class SitePage(models.Model):
    """ List of pages contained on our website """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    url = models.URLField()
