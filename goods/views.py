from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.shortcuts import render, get_object_or_404, redirect, get_list_or_404
from goods.models import Products, Categories
from goods.utils import q_search


# Create your views here.


def categories(request, category_slug=None):

    page = request.GET.get('page', 1)
    query = request.GET.get('q', None)

    if category_slug == 'all':
        goods = Products.objects.all()
    elif query:
        goods = q_search(query)
    else:
        goods = get_list_or_404(Products.objects.filter(category__slug=category_slug))

    paginator = Paginator(goods, 4)  # Show 8 products per page
    current_page = paginator.page(int(page))

    context = {
        'goods': current_page,
        'slug_url': category_slug
    }
    return render(request, 'goods/categories.html', context=context)


def products(request, product_slug):
    product = Products.objects.get(slug=product_slug)
    context = {'product': product}

    return render(request, 'goods/products.html', context=context)

