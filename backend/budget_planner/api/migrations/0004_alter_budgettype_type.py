# Generated by Django 5.0.3 on 2024-04-24 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_budgettype_is_income_budgettype_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budgettype',
            name='type',
            field=models.CharField(blank=True, default=None, max_length=7, null=True),
        ),
    ]