from rest_framework.routers import DefaultRouter
from .views import OrderViewSet

router = DefaultRouter()
router.register(r"orders", OrderViewSet, basename="order")

# router auto-generates all the CRUD URLs listed in views.py
urlpatterns = router.urls
