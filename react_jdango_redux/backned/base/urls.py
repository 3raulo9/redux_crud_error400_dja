from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from django.conf.urls.static import static
from .api_views import update_product  # Updated import statements 
from .views import GetImages, Products, ProductsView, UserRegistration  # Corrected import

urlpatterns = [
    path('login', TokenObtainPairView.as_view()),  # Updated endpoint with trailing slash
    path('register/', UserRegistration.as_view(), name='register'),  # Updated endpoint with trailing slash
    path('images/', GetImages.as_view(), name='get-images'),
    path('products/', Products),  # Function-based view for API endpoint
    path('products/<int:id>/', ProductsView.as_view()), # Updated endpoint with trailing slash and using Products view
    path('api/products/<int:id>/', update_product),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
