from django.contrib import admin
from .models import BudgetCategory, BudgetItem

# admin.site.register(User)
admin.site.register(BudgetCategory)
admin.site.register(BudgetItem)
