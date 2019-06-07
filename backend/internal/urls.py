from django.urls import path
from internal import views


urlpatterns = [
    path("u/<slug:slug>/<int:user>", views.BusinessDetail.as_view()),
    path("i/<slug:slug>/<int:product>", views.ProductDetail.as_view()),
    path("explore/<int:user>/", views.ExploreItemView.as_view()),
    path("explore/<lat>/<lng>/", views.ExploreBusinessView.as_view()),
]
