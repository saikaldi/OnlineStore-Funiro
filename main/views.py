from django.shortcuts import render
# from goods.models import Product
# Create your views here.

def index(request):
    # products=Products.objects.all()
    # return render(request, 'main/index.html', {'products': products})
    return render(request, 'main/index.html')

def about(request):
    return render(request, 'main/about.html')

