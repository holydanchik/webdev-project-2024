# Generated by Django 5.0.3 on 2024-04-24 13:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_budgettype_type'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='budgetcategory',
            options={'verbose_name_plural': 'Budget Categories'},
        ),
    ]