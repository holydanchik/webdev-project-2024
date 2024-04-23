from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import BudgetItem, BudgetCategory
from .serializers import BudgetItemSerializer, BudgetCategorySerializer
from rest_framework.authentication import TokenAuthentication


class BudgetItemCreateView(generics.CreateAPIView):
    queryset = BudgetItem.objects.all()
    serializer_class = BudgetItemSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Associating the current user with the created budget item
        serializer.save(owner=self.request.user)


class BudgetItemRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BudgetItem.objects.all()
    serializer_class = BudgetItemSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class BudgetCategoryListView(generics.ListAPIView):
    queryset = BudgetCategory.objects.all()
    serializer_class = BudgetCategorySerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class BudgetItemUpdateView(generics.UpdateAPIView):
    queryset = BudgetItem.objects.all()
    serializer_class = BudgetItemSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
