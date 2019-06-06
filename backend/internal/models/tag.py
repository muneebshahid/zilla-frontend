from django.db import models
from django.utils.text import slugify


class Tag(models.Model):
    """
        Model for all tags used by the site, also handels
        fixed tags such as business types
    """

    tag_types = [(0, "BUSINESS_TYPE"), (1, "AMENITY"), ("2", "VICTUAL_TAG")]
    tag = models.CharField(max_length=500, primary_key=True)
    slug = models.SlugField(unique=True)
    tag_type = models.IntegerField(choices=tag_types, default=-1)
    # Only to get rid of linting errors.
    objects = models.Manager()

    def save(self, *args, **kwargs):
        """ Compute slug and pass on to the parent class """
        if not self.slug:
            self.slug = slugify(self.tag)
        super().save(*args, **kwargs)


class BusinessTypeTag(Tag):
    """ """

    def save(self, *args, **kwargs):
        """ Tags for Business Types """
        self.tag_type = 0
        super().save(*args, **kwargs)


class AmenityTag(Tag):
    """ """

    def save(self, *args, **kwargs):
        """ Tag fo """
        self.tag_type = 1
        super().save(*args, **kwargs)


class VictualTag(Tag):
    """ """

    def save(self, *args, **kwargs):
        """ Compute slug and pass on to the parent class """
        self.tag_type = 2
        super().save(*args, **kwargs)

