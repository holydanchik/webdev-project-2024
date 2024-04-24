from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from .models import CustomUser, BudgetCategory, BudgetItem
from .serializers import UserRegistrationSerializer, CustomUserSerializer, CustomUserDetailSerializer, \
    BudgetCategorySerializer, BudgetItemSerializer, BudgetItemDetailSerializer


# USER REGISTRATION
class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# USER PROFILE VIEW
class CustomUserView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CustomUser.objects.filter(owner_id=self.request.user.id)


# BUDGET CATEGORY VIEWS
class BudgetCategoryListView(generics.ListAPIView):
    queryset = BudgetCategory.objects.all()
    serializer_class = BudgetCategorySerializer
    permission_classes = [IsAuthenticated]


# BUDGET ITEM VIEWS
class BudgetItemListView(generics.ListCreateAPIView):
    serializer_class = BudgetItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return BudgetItem.objects.filter(owner_id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BudgetItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BudgetItem.objects.all()
    serializer_class = BudgetItemDetailSerializer
    permission_classes = [IsAuthenticated]



