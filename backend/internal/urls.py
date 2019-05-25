from django.urls import path
from internal import views


urlpatterns = [path("b/<uuid>", views.Business.as_view())]
