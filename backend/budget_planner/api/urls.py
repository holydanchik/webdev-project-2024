from django.urls import path
from .views import BudgetItemCreateView, BudgetItemUpdateView, BudgetItemRetrieveUpdateDestroyAPIView, BudgetCategoryListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('budget-items/', BudgetItemCreateView.as_view(), name='budget-item-create'),
    path('budget-items/<int:pk>/', BudgetItemRetrieveUpdateDestroyAPIView.as_view(), name='budget-item-detail'),
    path('budget-categories/', BudgetCategoryListView.as_view(), name='budget-category-list'),
    path('budget-items/update/<int:pk>/', BudgetItemUpdateView.as_view(), name='budget-item-update'),
]
