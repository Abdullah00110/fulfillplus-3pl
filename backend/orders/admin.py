from django.contrib import admin
from .models import Order, Customer, Warehouse


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "warehouse", "product", "quantity", "status", "created_at")
    list_filter = ("status", "warehouse")
    search_fields = ("product", "reference_number", "customer__name")


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Warehouse)
class WarehouseAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)