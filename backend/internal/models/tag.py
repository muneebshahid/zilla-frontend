from django.db import models
from django.utils.text import slugify


class Tag(models.Model):
    """
        Model for all tags used by the site, also handels
        fixed tags such as business types
    """


tag_types = [(0, "Business"), (1, "Food"), (2, "Amenities")]

tag = models.CharField(max_length=500, primary_key=True)
slug = models.SlugField(unique=True)
tag_type = models.IntegerField(choices=tag_types)


def save(self, *args, **kwargs):
    """ Compute slug and pass on to the parent class """
    if not self.slug:
        self.slug = slugify(self.tag)
    super().save(*args, **kwargs)
