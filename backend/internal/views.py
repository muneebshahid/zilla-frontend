from django.shortcuts import render
from internal.models import Business, Product
from internal.serializers import BusinessSerializer, ProductSerialzier
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class BusinessDetail(APIView):
    # renderer_classes = (JSONRenderer,)

    def get(self, request, slug, user, format=None):
        """ Gets business page details """
        try:
            business = Business.objects.get(user=user, slug=slug)
            try:
                items_s = ProductSerialzier(
                    business.items.all(), many=True, exclude=["image", "item_type"]
                ).data
            except:
                items_s = {}
            business_s = BusinessSerializer(business).data
            business_s["items"] = items_s
            return Response(data=business_s, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data=str(e), status=status.HTTP_404_NOT_FOUND)


class ProductDetail(APIView):
    def get(self, request, slug, product, format=None):
        """ Gets details about a product """

        try:
            product = Product.objects.get(product=product, slug=slug)
            # For now we only have food drink items.
            product_s = ProductSerializer(product, exclude=["image"]).data
            return Response(data=product_s, status=status.HTTP_200_OK)
        except:
            return Response(data={}, status=status.HTTP_404_NOT_FOUND)


class ExploreBusinessView(APIView):
    """ Explore Business View """

    def get(self, request, format=None):
        """ Explore View """
        return Response(
            data=BusinessSerializer(
                Business.objects.all(), many=True, exclude=["latlng"]
            ).data,
            status=status.HTTP_200_OK,
        )


class ExploreItemView(APIView):
    """ Explore Item View """

    def get(self, request, user, format=None):
        """ Explore Items """
        try:
            business = Business.objects.get(user=user)
            items_s = ItemSerialzier(business.items.all(), many=True).data
            return Response(data=items_s, status=status.HTTP_200_OK)
        except:
            return Response(data={}, status=status.HTTP_404_NOT_FOUND)

