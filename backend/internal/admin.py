from django.contrib import admin
from internal.models import SiteUser, Business, Product, BusinessImage, ProductImage

# Register your models here.
admin.site.register(Business)
admin.site.register(Product)
admin.site.register(SiteUser)
admin.site.register(BusinessImage)
admin.site.register(ProductImage)
