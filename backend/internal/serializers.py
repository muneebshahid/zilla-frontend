from rest_framework import serializers
from internal.models import (
    Tag,
    Business,
    Product,
    OpeningTimings,
    BusinessImage,
    ProductImage,
)


class DynamicFieldsSerializer(serializers.ModelSerializer):
    """
    Overrides __init__ to allow dropping fields returned in the response on the fly.
    """

    def __init__(self, *args, **kwargs):
        """ Filters item that are not wanted in the response """

        def filter(items):
            """ Removes 'items' from self.fields """
            for item in items:
                if item in self.fields:
                    self.fields.pop(item)

        # Exclude all fields specified by 'exclude'
        if "exclude" in kwargs:
            self.exclude = kwargs.pop("exclude")
        elif "include" in kwargs:
            # Only include fields specified by 'include'
            include = kwargs.pop("include")
            self.exclude = [field for field in self.fields if field not in include]
        else:
            self.exclude = []

        super().__init__(*args, **kwargs)
        filter(self.exclude)


class BusinessImageSerializer(DynamicFieldsSerializer):
    """ Serializer for Images """

    class Meta:
        model = BusinessImage
        fields = "__all__"


class ProductImageSerializer(DynamicFieldsSerializer):
    """ Serializer for Images """

    class Meta:
        model = ProductImage
        fields = "__all__"


class TagSerializer(DynamicFieldsSerializer):
    """ Serializer for Tags """

    class Meta:
        model = Tag
        fields = "__all__"


class BusinessSerializer(DynamicFieldsSerializer):
    """ Serializer for Business Model """

    images = serializers.SerializerMethodField()
    business_type = serializers.SerializerMethodField()
    amenities = serializers.SerializerMethodField()
    opening_timings = serializers.SerializerMethodField()
    products = serializers.SerializerMethodField()

    def get_images(self, obj):
        if "images" not in self.exclude:
            return BusinessImageSerializer(
                obj.images, read_only=True, many=True, exclude=["id", "business"]
            ).data
        else:
            return None

    def get_business_type(self, obj):
        if "business_type" not in self.exclude:
            return TagSerializer(obj.business_type, exclude=["tag_type"]).data
        else:
            return None

    def get_amenities(self, obj):
        if "amenities" not in self.exclude:
            return TagSerializer(
                obj.amenities.all(), many=True, exclude=["tag_type"]
            ).data
        else:
            return None

    def get_opening_timings(self, obj):
        if "opening_timings" not in self.exclude:
            return obj.timings.all()[0].to_json()
        else:
            return None

    def get_products(self, obj):
        if "products" not in self.exclude:
            return ProductSerialzier(
                obj.products.all(),
                read_only=True,
                many=True,
                exclude=["owner", "hidden"],
            ).data
        else:
            return None

    class Meta:
        model = Business
        fields = "__all__"


class ProductSerialzier(DynamicFieldsSerializer):
    """ Serializer for Business Model """

    tags = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        if "images" not in self.exclude:
            return ProductImageSerializer(
                obj.images, read_only=True, many=True, exclude=["id", "product"]
            ).data
        else:
            return None

    def get_tags(self, obj):
        if "business_type" not in self.exclude:
            return TagSerializer(obj.tags.all(), many=True, exclude=["tag_type"]).data
        else:
            return None

    class Meta:
        model = Product
        fields = "__all__"


class OpeningTimingsSerializer(DynamicFieldsSerializer):
    """ Serializer for Tag Object """

    class Meta:
        model = OpeningTimings
        fields = "__all__"
