from django.contrib.postgres.fields import JSONField
from django.db import models

from internal.models import Business, Product, SitePage
from internal.models.offers import Ad, Coupon
from internal.models.stats import Stats


class PageStats(Stats):
    """ Abstract class for Page wide stats """

    date = models.DateField()
    num_clicks = models.IntegerField()

    # JSON Structure {"ip": {"num_clicks": int, "location": str}}
    click_details = JSONField()

    class Meta:
        abstract = True

    def update_stats(self, stats_dict):
        # TODO: Needs to be implemented.
        raise NotImplementedError("Needs to be implemented")


class BusinessPageStats(PageStats):
    """ Page wide stats for a business """

    business = models.ForeignKey(Business, on_delete=models.CASCADE)


class ItemPageStats(PageStats):
    """ Page wide stats for an Item """

    item = models.ForeignKey(Product, on_delete=models.CASCADE)


class AdPageStats(PageStats):
    """ Page wide stats for an Ad """

    ad = models.ForeignKey(Ad, on_delete=models.CASCADE)


class CouponPageStats(PageStats):
    """ Page wide stats for a Coupon """

    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE)


class SitePageStats(PageStats):
    """ Page wide stats for a Site page """

    site_page = models.ForeignKey(SitePage, on_delete=models.CASCADE)
