from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.forms import ValidationError
from django.shortcuts import redirect, render
from carts.models import Cart
from orders.forms import CreateOrderForm
from orders.models import Order, OrderItem

@login_required
def create_order(request):
    if request.method == 'POST':
        form = CreateOrderForm(data=request.POST)
        if form.is_valid():
            try:
                with transaction.atomic():
                    user = request.user
                    cart_items = Cart.objects.filter(user=user)
                    print(f"Cart items for user {user}: {cart_items}")

                    if cart_items.exists():
                        order = Order.objects.create(
                            user=user,
                            phone_number=form.cleaned_data['phone_number'],
                            requires_delivery=form.cleaned_data['requires_delivery'] == '1',
                            delivery_address=form.cleaned_data['delivery_address'],
                            payment_on_get=form.cleaned_data['payment_on_get'] == '1',
                        )
                        print(f"Order created: {order}")

                        for cart_item in cart_items:
                            product = cart_item.product
                            name = product.name
                            price = product.price
                            quantity = cart_item.quantity

                            if product.quantity < quantity:
                                raise ValidationError(f'Insufficient quantity of goods {name} available. Available - {product.quantity}')

                            OrderItem.objects.create(
                                order=order,
                                product=product,
                                name=name,
                                price=price,
                                quantity=quantity,
                            )
                            product.quantity -= quantity
                            product.save()
                            print(f"OrderItem created for product: {product.name}, quantity: {quantity}")

                        cart_items.delete()
                        print(f"Cart items for user {user} deleted.")

                        messages.success(request, 'The order has been placed!')
                        return redirect('user:profile')
                    else:
                        messages.error(request, 'Your cart is empty.')
                        return redirect('cart:cart_detail')
            except ValidationError as e:
                messages.error(request, str(e))
                return redirect('orders:create_order')
            except Exception as e:
                print(f"An error occurred: {e}")
                messages.error(request, 'An error occurred while processing your order.')
                return redirect('orders:create_order')
        else:
            print(f"Form is not valid: {form.errors}")
            messages.error(request, 'There was an error with your form submission.')
    else:
        initial = {
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
        }
        form = CreateOrderForm(initial=initial)

    context = {
        'form': form,
        'order': True,
    }
    return render(request, 'orders/create_order.html', context=context)
