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

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


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
