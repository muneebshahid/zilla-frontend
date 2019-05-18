import uuid
from django.db import models
from internal.models.offers import Deal


class Coupon(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    code = models.CharField(max_length=50)
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE)
    redeemed = models.BooleanField()
    expired = models.BooleanField()
    expiry_date = models.DateTimeField()

    def is_valid(self):
        # TODO: Needs to be implemented
        raise NotImplementedError("Not implemented yet")
