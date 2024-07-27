from django.shortcuts import render
from goods.models import Categories, Products
# Create your views here.

def index(request):
    categories = Categories.objects.all()
    context = {
        'categories': categories
    }

    return render(request, 'main/index.html', context)

def about(request):
    return render(request, 'main/about.html')

