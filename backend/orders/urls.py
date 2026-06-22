from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, CustomerViewSet, WarehouseViewSet

router = DefaultRouter()
router.register(r"orders", OrderViewSet, basename="order")
router.register(r"customers", CustomerViewSet, basename="customer")
router.register(r"warehouses", WarehouseViewSet, basename="warehouse")

urlpatterns = router.urls