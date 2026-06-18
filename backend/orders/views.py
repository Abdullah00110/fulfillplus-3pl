from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    """
    Gives you ALL CRUD endpoints automatically:

      GET    /api/orders/        -> list      (Read all)
      POST   /api/orders/        -> create    (Create)
      GET    /api/orders/{id}/   -> retrieve  (Read one)
      PUT    /api/orders/{id}/   -> update    (Update)
      PATCH  /api/orders/{id}/   -> partial   (Update)
      DELETE /api/orders/{id}/   -> destroy   (Delete)
    """

    queryset = Order.objects.all()
    serializer_class = OrderSerializer
