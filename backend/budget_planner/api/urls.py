from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    #USER INFO
    path('user/', views.CustomUserView.as_view(), name='user'),

    #budget
    path('budgetCategory/', views.BudgetCategoryListView.as_view(), name='budget_category'),
    path('budgetItem/', views.BudgetItemListView.as_view(), name='budget_item'),
    path('budgetItem/<int:pk>/', views.BudgetItemDetailView.as_view(), name='budget_item_detail'),

    #LOGIN
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh_view'),
    path('register/', views.UserRegistrationView.as_view(), name='user_registration'),
]
