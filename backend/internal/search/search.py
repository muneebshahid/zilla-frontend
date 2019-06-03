from internal.models import Business, Item


class Search:
    """ Implements Basic Search """

    @staticmethod
    def find(query):
        business = Business.objects.get(title__contains=query)
