from django.http import JsonResponse
from django.views import View
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response
from .serializers import ProductSerializer, UserSerializer
from .models import Product
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework import generics 

@api_view(['GET', 'POST'])
def Products(request, id=None):
    if request.method == 'GET':
        if id is not None:
            try:
                product = get_object_or_404(Product, id=id)
                serializer = ProductSerializer(product)
                return Response(serializer.data)
            except Product.DoesNotExist:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        user_id = request.data.get('user')
        product_data = request.data.copy()
        product_data['user'] = user_id
        serializer = ProductSerializer(data=product_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Print validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class GetImages(View):
    def get(self, request):
        res = [] #create an empty list
        for img in Product.objects.all(): #run on every row in the table...
            res.append({
                "title": img.title,
                "description": img.description,
                "completed": False,
                "image": str(img.image)
            }) #append row by row to res list
        return JsonResponse(res, safe=False)

class APIViews(APIView):
    parser_class = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        api_serializer = ProductSerializer(data=request.data)
        if api_serializer.is_valid():
            api_serializer.save()
            return Response(api_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', api_serializer.errors)
            return Response(api_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserRegistration(generics.CreateAPIView):
    serializer_class = UserSerializer

@api_view(['GET'])
def get_products(request, id=None):
    if request.method == 'GET':
        if id is not None:
            try:
                product = get_object_or_404(Product, id=id)
                serializer = ProductSerializer(product)
                return Response(serializer.data)
            except Product.DoesNotExist:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)


class ProductsView(View):
    def get(self, request, id=None):
        if id is not None:
            # Implement logic to retrieve a specific product by ID
            return JsonResponse({"message": f"Retrieve product with ID {id}"})
        else:
            # Implement logic to retrieve all products
            return JsonResponse({"message": "Retrieve all products"})

    def post(self, request):
        # Implement logic to create a new product
        return JsonResponse({"message": "Create a new product"})
