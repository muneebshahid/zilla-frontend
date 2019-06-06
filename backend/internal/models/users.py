from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from internal.models import AmenityTag, BusinessTypeTag


class SiteUser(AbstractUser):
    is_business = models.BooleanField(default=False)


class Business(models.Model):
    """ OneToOne Model to SiteUser """

    prepopulated_fields = {"slug": ("title",)}
    TYPES = ((0, "Resturant"), (1, "Cafe"), (2, "Bar"), (3, "Club"))

    user = models.OneToOneField(
        SiteUser, on_delete=models.CASCADE, related_name="business", primary_key=True
    )
    title = models.CharField(max_length=500)
    slug = models.SlugField(max_length=500)
    description = models.TextField()
    website = models.CharField(max_length=500)
    address = models.TextField()
    claimed = models.BooleanField()
    latlng = ArrayField(models.FloatField())
    objects = models.Manager()
    amenities = models.ManyToManyField(AmenityTag, related_name="businesses")
    business_type = models.ForeignKey(
        BusinessTypeTag, on_delete=models.PROTECT, related_name="businesses"
    )

    def __str__(self):
        return self.title

    # def _get_unique_slug(self):
    #     slug = slugify(self.title)
    #     unique_slug = slug
    #     num = 1
    #     while Business.objects.filter(slug=unique_slug).exists():
    #         unique_slug = "{}-{}".format(slug, num)
    #         num += 1
    #     return unique_slug

    def save(self, *args, **kwargs):
        """ Compute slug and pass on to the parent class """
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def is_open(self):
        raise NotImplementedError("Needs to be implemented")
