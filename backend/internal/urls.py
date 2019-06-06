from django.urls import path
from internal import views


urlpatterns = [
    path("u/<slug>/<user>", views.BusinessDetail.as_view()),
    path("i/<slug>/<product>", views.ProductDetail.as_view()),
    path("explore/", views.ExploreBusinessView.as_view()),
    path("explore/<user>/", views.ExploreItemView.as_view()),
]
