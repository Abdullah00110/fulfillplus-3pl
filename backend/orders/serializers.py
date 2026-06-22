from rest_framework import serializers
from .models import Order, Customer, Warehouse


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["id", "name"]


class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ["id", "name"]


class OrderSerializer(serializers.ModelSerializer):
    # show the names in responses (read-only, handy for the table)
    customer_name = serializers.CharField(source="customer.name", read_only=True)
    warehouse_name = serializers.CharField(source="warehouse.name", read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "customer",
            "customer_name",
            "warehouse",
            "warehouse_name",
            "product",
            "quantity",
            "reference_number",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError("Quantity must be at least 1.")
        return value