from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    """Turns an Order into JSON (and validates JSON back into an Order)."""

    class Meta:
        model = Order
        fields = [
            "id",
            "customer_name",
            "product",
            "quantity",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_quantity(self, value):
        if value < 1:
            raise serializers.ValidationError("Quantity must be at least 1.")
        return value
