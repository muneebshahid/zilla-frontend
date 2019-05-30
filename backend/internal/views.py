from django.shortcuts import render
from internal.models import Business, Item
from internal.serializers import BusinessSerializer, ItemSerialzier, VictualSerializer
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class BusinessProfile(APIView):
    # renderer_classes = (JSONRenderer,)

    def get(self, request, slug, user, format=None):
        """ Gets business page details """
        try:
            business = Business.objects.get(user=user, slug=slug)
            try:
                items_s = ItemSerialzier(
                    business.items.all(),
                    many=True,
                    # include=["item"]
                    exclude=["image", "item_type"],
                ).data
            except:
                items_s = {}
            business_s = BusinessSerializer(business).data
            business_s["items"] = items_s
            return Response(data=business_s, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data=str(e), status=status.HTTP_404_NOT_FOUND)


class ItemProfile(APIView):
    def get(self, request, slug, item, format=None):
        """ Gets details about an item """

        try:
            item = Item.objects.get(item=item, slug=slug)
            # For now we only have food drink items.
            item_s = VictualSerializer(item.victual, exclude=["image"]).data
            return Response(data=item_s, status=status.HTTP_200_OK)
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
