from django.contrib import admin
from internal.models import SiteUser, Business, Item, Victual, BusinessImage, ItemImage

# Register your models here.
admin.site.register(Business)
admin.site.register(Item)
admin.site.register(Victual)
admin.site.register(SiteUser)
admin.site.register(BusinessImage)
admin.site.register(ItemImage)
