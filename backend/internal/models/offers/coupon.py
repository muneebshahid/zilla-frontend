from django.db import models
from internal.models.offers import Deal


class Coupon(models.Model):

    id = models.IntegerField(primary_key=True)
    code = models.CharField(max_length=50)
    deal = models.ForeignKey(Deal, on_delete=models.CASCADE)
    redeemed = models.BooleanField()
    expired = models.BooleanField()
    expiry_date = models.DateTimeField()

    def is_valid(self):
        # TODO: Needs to be implemented
        raise NotImplementedError("Not implemented yet")
