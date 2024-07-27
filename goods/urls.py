from django.urls import path
from goods import views

app_name = 'goods'

urlpatterns = [
    path('', views.categories, name='categories'),
    path('products/', views.products, name='products')
]