from django.db import models
from internal.models import Business


class Promotion(models.Model):

    id = models.IntegerField(primary_key=True)
    description = models.TextField()
    time_created = models.DateTimeField()
    expiry_date = models.DateTimeField()
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    code = models.CharField(max_length=50)

    class Meta:
        abstract = True


class Deal(Promotion):
    """ Model for a deal """

    image = models.ImageField(upload_to="media/promotions/deals/")

    def generate_coupon(self):
        """ Generates the coupon for the deal """
        raise NotImplementedError("Method not imlemented yet")


class Ad(Promotion):
    """ Model for an Ad """

    image = models.ImageField(upload_to="media/promotions/ads/")
    cost_limit = models.FloatField()
    # l = models.IntegerField()

    def get_incurred_cost(self):
        """ Returns the cost incurred until now """
        raise NotImplementedError("Method not imlemented yet")
