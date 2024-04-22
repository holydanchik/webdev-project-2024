from django.contrib import admin
from .models import BudgetCategory, BudgetItem, Token

# admin.site.register(User)
admin.site.register(BudgetCategory)
admin.site.register(BudgetItem)
admin.site.register(Token)
