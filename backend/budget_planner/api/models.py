from django.db import models
from django.contrib.auth.models import AbstractUser, User

'''
class User(AbstractUser):
    pass
'''

class BudgetCategory(models.Model):
    name = models.CharField(max_length=100)

class BudgetItem(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(BudgetCategory, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()

class Token(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100)
