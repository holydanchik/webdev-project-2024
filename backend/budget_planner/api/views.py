from rest_framework import generics
from rest_framework.response import Response
from .models import CustomUser, BudgetCategory, BudgetItem
from .serializers import CustomUserSerializer, CustomUserDetailSerializer, BudgetCategorySerializer, BudgetItemSerializer, BudgetItemDetailSerializer


class CustomUserView(generics.RetrieveUpdateAPIView):
    # queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        return CustomUser.objects.filter(owner_id=self.request.user.id)



class BudgetCategoryView(generics.ListAPIView):
    queryset = BudgetCategory.objects.all()
    serializer_class = BudgetCategorySerializer


class BudgetItemView(generics.ListCreateAPIView):
    # queryset = BudgetItem.objects.all()
    serializer_class = BudgetItemSerializer

    def get_queryset(self):
        return BudgetItem.objects.filter(owner_id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BudgetItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BudgetItem.objects.all()
    serializer_class = BudgetItemSerializer


# class RegisterView(generics.CreateAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = CustomUserSerializer


# class UserBudgetItemsView(generics.ListAPIView):
#     serializer_class = BudgetItemDetailSerializer
#
#     def get_queryset(self):
#         return BudgetItem.objects.filter(owner_id=self.request.user.id)
#
