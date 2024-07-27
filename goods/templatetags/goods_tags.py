from django import template
from goods.models import Categories, Products

register = template.Library()

@register.simple_tag(takes_context=True)
def tag_categories(context):
    request = context['request']
    categories = Categories.objects.all()
    return categories



@register.simple_tag(takes_context=True)
def tag_products(context):
    request = context['request']
    products = Products.objects.all()
    return products