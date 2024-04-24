from django.contrib.auth.models import AbstractUser, User
from django.core.validators import MinValueValidator
from django.db import models


class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None, null=True, blank=True)
    gender = models.BooleanField(default=None)
    age = models.PositiveIntegerField(validators=[MinValueValidator(0)], null=True, blank=True)


class BudgetCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "Budget Categories"

    def __str__(self):
        return self.name


class BudgetType(models.Model):
    type = models.CharField(max_length=7, default=None, null=True, blank=True)

    def __str__(self):
        return self.type

class BudgetItem(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    category = models.ForeignKey(BudgetCategory, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    budget_type = models.ForeignKey(BudgetType, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return self.category.name + " - " + str(self.amount)