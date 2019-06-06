import os
import uuid
import ntpath
from django.db import models
from django.dispatch import receiver
from internal.models import Business, Item


def get_business_image_path(instance, filename):
    return os.path.join(
        "business", str(instance.business.user.id), "{}.jp2".format(str(uuid.uuid4()))
    )


def get_item_image_path(instance, filename):
    return os.path.join("item", str(instance.item), "{}.jp2".format(str(uuid.uuid4())))


class BusinessImage(models.Model):

    business = models.ForeignKey(
        Business, related_name="images", on_delete=models.CASCADE
    )
    file = models.ImageField(upload_to=get_business_image_path)


class ItemImage(models.Model):

    item = models.ForeignKey(Item, related_name="images", on_delete=models.CASCADE)
    file = models.ImageField(upload_to=get_item_image_path)


@receiver(models.signals.post_delete, sender=[BusinessImage, ItemImage])
def auto_delete_image_on_delete(sender, instance, **kwargs):
    """
        Deletes file from the file system
    """
    if instance.file:
        if os.path.isfile(instance.file.path):
            os.remove(instance.file.path)
