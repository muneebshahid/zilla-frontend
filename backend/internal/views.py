from django.shortcuts import render
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class Business(APIView):
    renderer_classes = (TemplateHTMLRenderer,)

    def get(self, request, title, uuid, format=None):
        return Response({"uuid": uuid}, template_name="business.html")
