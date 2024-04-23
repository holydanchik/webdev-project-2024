from rest_framework import serializers
from .models import User, BudgetItem, BudgetCategory, Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class BudgetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetCategory
        fields = '__all__'

class BudgetItemSerializer(serializers.ModelSerializer):

    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = BudgetItem
        fields = '__all__'

class TokenSerializer(serializers.Serializer):
    user = serializers.CharField(max_length=100)
    token = serializers.CharField(max_length=100)

