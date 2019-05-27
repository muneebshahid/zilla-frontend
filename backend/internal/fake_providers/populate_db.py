""" Code for populating db """

import os
from faker import Faker
import django
import numpy as np
from internal.fake_providers import Provider

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "zilla.settings")
django.setup()

from internal.models import Business, SiteUser, Victual

fake = Faker()
fake.add_provider(Provider)
SiteUser.objects.all().delete()
Business.objects.all().delete()

NUM_BUSINESSES = 100

for i in range(NUM_BUSINESSES):
    user = SiteUser(
        username=fake.format("user_name"),
        password=fake.format("password"),
        email=fake.format("company_email"),
        first_name="",
        last_name="",
        is_business=True,
    )
    user.save()
    business = Business(
        user=user,
        title=fake.format("company"),
        description=fake.format("text"),
        website=fake.format("hostname"),
        address=fake.format("address"),
        claimed=fake.format("boolean"),
        latlng=[float(x) for x in fake.format("latlng")],
    )
    business.save()
    for _ in range(50):
        Victual(
            title=fake.format("victual"),
            owner=business,
            description=fake.format("text"),
            price=np.round(np.random.uniform(15), 2),
            available=fake.format("boolean"),
            hidden=fake.format("boolean"),
            tags=fake.format("text"),
            max_price=np.round(np.random.uniform(14, 20), 2),
            portion_prices_combos={},
            addon_price_combos={},
        ).save()
    print("{0:.2f} % Done".format((i + 1) / NUM_BUSINESSES * 100))

