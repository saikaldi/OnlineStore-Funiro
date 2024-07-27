from django.urls import path
from goods import views

app_name = 'goods'

urlpatterns = [
    path('', views.categories, name='index'),
    path('products/<int:product_id>/', views.products, name='products'),
]