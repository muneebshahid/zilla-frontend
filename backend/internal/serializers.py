from rest_framework import serializers
from internal.models import Tag, Business, Item, Victual, OpeningTimings


class DynamicFieldsSerializer(serializers.ModelSerializer):
    """
    Overrides __init__ to allow dropping fields returned in the response on the fly.
    """

    def __init__(self, *args, **kwargs):
        """ Filters item that are not wanted in the response """

        def filter(items):
            """ Removes 'items' from self.fields """
            for item in items:
                self.fields.pop(item)

        # Exclude all fields specified by 'exclude'
        if "exclude" in kwargs:
            filter(kwargs.pop("exclude"))

        # Only include fields specified by 'include'
        elif "include" in kwargs:
            include = kwargs.pop("include")
            filter([field for field in self.fields if field not in include])

        super().__init__(*args, **kwargs)


class BusinessSerializer(DynamicFieldsSerializer):
    """ Serializer for Business Model """

    class Meta:
        model = Business
        fields = "__all__"


class ItemSerialzier(DynamicFieldsSerializer):
    """ Serializer for Business Model """

    class Meta:
        model = Item
        fields = "__all__"


class VictualSerializer(DynamicFieldsSerializer):
    """ Serializer for Vicual """

    class Meta:
        model = Victual
        fields = "__all__"


class TagSerializer(DynamicFieldsSerializer):
    """ Serializer for Tags """

    class Meta:
        model = Tag
        fields = "__all__"


class OpeningTimingsSerializer:
    """ Serializer for Tag Object """

    class Meta:
        model = OpeningTimings
        fields = "__all__"
