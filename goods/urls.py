from django.urls import path
from goods import views

app_name = 'goods'

urlpatterns = [
    path('search/', views.categories, name='search'),
    path('<slug:category_slug>/', views.categories, name='index'),
    path('products/<slug:product_slug>/', views.products, name='products'),
]