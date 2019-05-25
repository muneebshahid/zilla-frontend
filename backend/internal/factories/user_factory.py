import factory
from internal.models import Business, SiteUser


class SiteUserFactory(factory.Factory):
    class Meta:
        model = SiteUser

    first_name = "test"


class SiteBusinessUserFactory(factory.Factory):
    class Meta:
        model = SiteUser

    is_business = True


class BusinessFactor(factory.Factory):
    class Meta:
        model = Business

    # user.username = "Test"
    # user.admin = False
    is_business = True
