import random, os
from glob import glob
from internal.models import AmenityTag, BusinessTypeTag, VictualTag
from faker.providers import BaseProvider
from django.core.files import File

# create new provider class. Note that the class name _must_ be ``Provider``.
class Provider(BaseProvider):

    BUSINESS_TYPE_TAGS = ["Resturant", "Cafe", "Bar", "Ice Cream Parlour", "Shop"]

    AMENITY_TAGS = [
        "Accepts Credit Cards",
        "Outdoor Shopping",
        "Smoking Allowed",
        "Bike Parking",
        "Parking Street",
        "Wheelchair Accessble",
        "Reservations",
        "Wireless Internet",
    ]

    VICTUAL_TAGS = [
        "halal",
        "vegan",
        "alkohal frei",
        "contains meat",
        "cheese",
        "alkohal",
        "spicy",
        "vegetarian",
        "egg",
        "fish",
        "sweet",
        "caffiene",
        "bacon",
        "soya",
        "almonds",
        "peanut",
    ]

    VICTUALS = [
        "Mega Burger",
        "Chicken Burger",
        "Vegetable Burger",
        "Cheese Burger",
        "Mexican Burger",
        "Frites",
        "Grand Pizza",
        "Peperoni Pizza",
        "Mexican Pizza",
        "Wine",
        "Budweiser",
        "Beer",
        "Cocktail",
        "Coffee",
        "Latte",
        "Crossiant",
        "Bagguete",
        "Milch",
        "Dönner",
        "Yufka",
        "Carrot Cake",
        "Cream Puff",
        "Chocolate Brownie",
        "Blue Cheese Burger",
        "American style Burger",
        "Cream Donut",
        "Plain Donut",
        "Coco Donut",
        "Flat White Coffee",
    ]

    def victual(self):
        """ Returns a random vitual """
        return random.choice(Provider.VICTUALS)

    def amenity(self):
        """ Returns a random business type """
        return AmenityTag.objects.get(tag=random.choice(Provider.AMENITY_TAGS))

    def business_type(self):
        """ Returns a random business type """
        return BusinessTypeTag.objects.get(
            tag=random.choice(Provider.BUSINESS_TYPE_TAGS)
        )

    def victual_tag(self):
        """ Return a random Victual Tag """
        return VictualTag.objects.get(tag=random.choice(Provider.VICTUAL_TAGS))

    def random_image_file(self, end_dir):
        """ Returns a random file object from end_dir """
        return File(
            open(
                random.choice(
                    glob(
                        "{}/*.jp2".format(
                            os.path.join(
                                "backend",
                                "internal",
                                "fake_providers",
                                "images",
                                end_dir,
                            )
                        )
                    )
                ),
                "rb",
            )
        )

    def item_image(self):
        """ Returns a random file path from items directory """
        return self.random_image_file("items")

    def business_image(self):
        """ Returns a random file path from business directory """
        return self.random_image_file("business")
