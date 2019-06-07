""" Code for populating db """

import os, random
from faker import Faker
from tqdm import tqdm
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "zilla.settings")
django.setup()
import numpy as np
from internal.fake_providers import Provider
from django.core.files import File


from internal.models import (
    Business,
    SiteUser,
    OpeningTimings,
    BusinessImage,
    ProductImage,
    Product,
    AmenityTag,
    BusinessTypeTag,
    ProductTag,
    Tag,
    OpeningTimings,
)

fake = Faker()
fake.add_provider(Provider)


SiteUser.objects.filter(is_superuser=False).delete()
Business.objects.all().delete()
Tag.objects.all().delete()

for business_type in Provider.BUSINESS_TYPE_TAGS:
    BusinessTypeTag(tag=business_type).save()

for amenity in Provider.AMENITY_TAGS:
    AmenityTag(tag=amenity).save()

for tag in Provider.PRODUCT_TAGS:
    ProductTag(tag=tag).save()

NUM_BUSINESSES = 100

for i in tqdm(range(NUM_BUSINESSES)):
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
        phone_no=fake.format("phone_number"),
        claimed=fake.format("boolean"),
        latlng=[float(x) for x in fake.format("latlng")],
        business_type=fake.format("business_type"),
    )
    business.save()
    business.amenities.set([fake.format("amenity") for _ in range(5)])
    for _ in range(50):
        product = Product(
            title=fake.format("product_title"),
            owner=business,
            description=fake.format("text"),
            price=np.round(np.random.uniform(15), 2),
            available=fake.format("boolean"),
            hidden=fake.format("boolean"),
        )
        product.save()
        product.tags.set([fake.format("product_tag") for _ in range(5)])
        ProductImage(product=product).file.save("", fake.format("product_image"))
    OpeningTimings(
        business=business,
        monday_open=fake.format("time"),
        monday_close=fake.format("time"),
        tuesday_open=fake.format("time"),
        tuesday_close=fake.format("time"),
        wednesday_open=fake.format("time"),
        wednesday_close=fake.format("time"),
        thursday_open=fake.format("time"),
        thursday_close=fake.format("time"),
        friday_open=fake.format("time"),
        friday_close=fake.format("time"),
        saturday_open=fake.format("time"),
        saturday_close=fake.format("time"),
        sunday_open=fake.format("time"),
        sunday_close=fake.format("time"),
    ).save()
    for _ in range(random.randint(0, 3)):
        BusinessImage(business=business).file.save("", fake.format("business_image"))
