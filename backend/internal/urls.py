from django.urls import path
from internal import views


urlpatterns = [
    path("u/<slug:slug>/<int:user>", views.BusinessDetailView.as_view()),
    path("p/<slug:slug>/<int:product>", views.ProductDetailView.as_view()),
    path("e/<int:user>", views.ExploreBusinessView.as_view()),
    path("e/<lat>/<lng>", views.ExploreView.as_view()),
    path("s/<query>/<lat>/<lng>", views.SearchView.as_view()),
]
