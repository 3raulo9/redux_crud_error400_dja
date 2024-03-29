from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    desc = models.CharField(max_length=50, null=True, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    createdTime = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(null=True, blank=True, upload_to='images/')
    completed = models.BooleanField(default=False)

    fields = ['user', 'price']

    def __str__(self):
        return self.user.username if self.user else 'No User Assigned'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']  # Add more fields if needed

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
