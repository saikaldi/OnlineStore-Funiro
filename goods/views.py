from django.shortcuts import render

# Create your views here.


def products(request):
    return render(request, 'goods/products.html')


def categories(request):
    return render(request, 'goods/products.html')
