from django.shortcuts import render
from internal.models import Business, BusinessImage, Product, ProductImage
from internal.serializers import BusinessSerializer, ProductSerialzier
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class BusinessDetailView(APIView):
    # renderer_classes = (JSONRenderer,)

    def get(self, request, slug, user, format=None):
        """ Gets business page details """
        try:
            return Response(
                data=BusinessSerializer(
                    Business.objects.get(user=user, slug=slug)
                ).data,
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(data=str(e), status=status.HTTP_404_NOT_FOUND)


class ProductDetailView(APIView):
    def get(self, request, slug, product, format=None):
        """ Gets details about a product """

        try:
            product = Product.objects.get(product=product, slug=slug)
            print(product)
            product_s = ProductSerialzier(product, exclude=["hidden"]).data
            return Response(data=product_s, status=status.HTTP_200_OK)
        except:
            return Response(data={}, status=status.HTTP_404_NOT_FOUND)


class ExploreView(APIView):
    """ Explore Business View """

    def get(self, request, lat, lng, format=None):
        """ Explore View """
        return Response(
            data=BusinessSerializer(
                Business.objects.all(),
                many=True,
                exclude=["products", "latlng", "amenities"],
            ).data,
            status=status.HTTP_200_OK,
        )


class ExploreBusinessView(APIView):
    """ Explore Item View """

    def get(self, request, user, format=None):
        """ Explore Items """
        try:
            business = Business.objects.get(user=user)
            items_s = ProductSerialzier(
                business.products.all(), many=True, exclude=["hidden"]
            ).data
            return Response(data=items_s, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data=str(e), status=status.HTTP_404_NOT_FOUND)


class SearchView(APIView):
    """ Returns search """

    def get(self, request, query, lat, lng, format=None):
        """ """
        try:
            query_regex = r"({})".format(query.replace(" ", ""))
            business = Business.objects.filter(title__iregex=query_regex)[:20]
            products = Product.objects.filter(title__iregex=query_regex)[:20]
            return Response(
                data=dict(
                    products=ProductSerialzier(
                        products, many=True, exclude=["hidden"]
                    ).data,
                    businesses=BusinessSerializer(
                        business, many=True, exclude=["products"]
                    ).data,
                )
            )
        except Exception as e:
            return Response(data=str(e), status=status.HTTP_404_NOT_FOUND)
