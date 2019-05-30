from django.urls import path
from internal import views


urlpatterns = [
    path("u/<slug>/<user>", views.BusinessProfile.as_view()),
    path("i/<slug>/<item>", views.ItemProfile.as_view()),
    path("explore/", views.ExploreBusinessView.as_view()),
    path("explore/<user>/", views.ExploreItemView.as_view()),
]
