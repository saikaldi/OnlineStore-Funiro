from django.urls import path
from goods import views

app_name = 'goods'

urlpatterns = [
    path('<slug:category_slug>/', views.categories, name='index'),
    path('<slug:category_slug>/<int:page>/', views.categories, name='index'),
    path('products/<slug:product_slug>/', views.products, name='products'),
]