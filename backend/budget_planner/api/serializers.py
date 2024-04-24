from django.contrib.auth.models import User
from rest_framework import serializers

from .models import CustomUser, BudgetCategory, BudgetItem, BudgetType


# USER REGISTRATION
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class CustomUserDetailSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    gender = serializers.BooleanField()
    age = serializers.IntegerField()


class BudgetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetCategory
        fields = '__all__'


class BudgetItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetItem
        fields = '__all__'


class BudgetItemDetailSerializer(serializers.Serializer):
    category = serializers.PrimaryKeyRelatedField(queryset=BudgetCategory.objects.all())
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    budget_type = serializers.PrimaryKeyRelatedField(queryset=BudgetType.objects.all())
    date = serializers.DateField()
