from django.urls import path
from internal import views


urlpatterns = [
    path("u/<slug:slug>/<int:user>/", views.BusinessDetail.as_view()),
    path("p/<slug:slug>/<int:product>/", views.ProductDetail.as_view()),
    path("explore/<int:user>/", views.ExploreBusinessView.as_view()),
    path("explore/<lat>/<lng>/", views.ExploreView.as_view()),
]
