from django.db import models

# Create your models here.
from django.db import models
from django.urls import reverse
# Create your models here.

class Categories(models.Model):
    name = models.CharField(max_length=155, unique=True)
    slug = models.SlugField(max_length=155, unique=True, blank=True, null=True, verbose_name="URL")

    class Meta:
        db_table = 'category'
        verbose_name = 'Category'
        verbose_name_plural = "Categories"

    def get_absolute_url(self):
        return reverse("categories:product", kwargs={"product_slug": self.slug})

    def __str__(self):
        return self.name

class Products(models.Model):
    name = models.CharField(max_length=155, unique=True)
    slug = models.SlugField(max_length=155, unique=True, blank=True, null=True, verbose_name="URL")
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='goods_images', blank=True, null=True)
    price = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    quantity = models.PositiveIntegerField(default=0)
    category = models.ForeignKey(to=Categories, on_delete=models.CASCADE)

    class Meta:
        db_table = 'product'
        verbose_name = 'Product'
        verbose_name_plural = "Products"
        ordering = ('id',)

    def __str__(self):
        return self.name

    def display_id(self):
        return f"{self.id:05}"