from django.shortcuts import render
from goods.models import Categories, Products
from main.models import RoomInspire
# Create your views here.

def index(request):
    categories = Categories.objects.all()
    rooms = RoomInspire.objects.all()
    context = {
        'categories': categories,
        'rooms': rooms

    }

    return render(request, 'main/index.html', context=context)

def about(request):
    return render(request, 'main/about.html')

def more_designs(request):
    rooms = RoomInspire.objects.all()
    context = {
        'rooms': rooms
    }
    return render(request, 'main/design.html', context=context)