from django.shortcuts import render
from goods.models import Products, Categories
# Create your views here.


def categories(request):

    return render(request, 'goods/categories.html')


def products(request, product_slug):
    product = Products.objects.get(slug=product_slug)
    context = {'product': product}

    return render(request, 'goods/products.html', context=context)

