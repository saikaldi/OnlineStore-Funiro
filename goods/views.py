from django.shortcuts import render
from goods.models import Products
# Create your views here.


def products(request):
    products = Products.objects.all()
    context = {
        'products': products
    }

    return render(request, 'goods/products.html', context)


def categories(request):
    return render(request, 'goods/products.html')
