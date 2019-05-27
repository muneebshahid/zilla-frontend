import random
from faker.providers import BaseProvider

# create new provider class. Note that the class name _must_ be ``Provider``.
class Provider(BaseProvider):
    VICTUAL_LIST = [
        "mega burger",
        "chicken burger",
        "vegetable burger",
        "cheese burger",
        "mexican burger",
        "frites",
        "grand pizza",
        "peperoni pizza",
        "mexican pizza",
        "wine",
        "budweiser",
        "beer",
        "cocktail",
        "coffee",
        "latte",
        "crossiant",
        "bagguete",
        "milch",
        "Dönner",
        "Yufka",
    ]

    def victual(self):
        """ Returns a random vitual """
        return random.choice(Provider.VICTUAL_LIST)
