
$(document).ready(function () {
    // Get markup element with jq-notification identifier for AJAX notifications
    var successMessage = $("#jq-notification");

    // Handle the "Add to Cart" button click
    $(document).on("click", ".add-to-cart", function (e) {
        e.preventDefault(); // Prevent the default action

        var goodsInCartCount = $("#goods-in-cart-count");
        var cartCount = parseInt(goodsInCartCount.text() || 0);

        var product_id = $(this).data("product-id");
        var add_to_cart_url = $(this).attr("href");

        $.ajax({
            type: "POST",
            url: add_to_cart_url,
            data: {
                product_id: product_id,
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                // Display success message
                successMessage.html(data.message);
                successMessage.fadeIn(400);
                setTimeout(function () {
                    successMessage.fadeOut(400);
                }, 7000);

                // Update cart count and cart items
                cartCount++;
                goodsInCartCount.text(cartCount);

                var cartItemsContainer = $("#cart-items-container");
                cartItemsContainer.html(data.cart_items_html);
            },
            error: function (data) {
                console.log("Error when adding a product to cart", data);
            },
        });
    });



    // Interception of the event of pressing the button to remove an item from the cart
    $(document).on("click", ".remove-from-cart", function (e) {
        // Blocking its base action
        e.preventDefault();

        // We take the counter element in the cart icon and take the value from there
        var goodsInCartCount = $("#goods-in-cart-count");
        var cartCount = parseInt(goodsInCartCount.text() || 0);

        // Get cart id from the data-cart-id attribute
        var cart_id = $(this).data("cart-id");
        // Из атрибута href берем ссылку на контроллер django
        var remove_from_cart = $(this).attr("href");

        // make post request via ajax without reloading the page
        $.ajax({

            type: "POST",
            url: remove_from_cart,
            data: {
                cart_id: cart_id,
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            },
            success: function (data) {
                // Message
                successMessage.html(data.message);
                successMessage.fadeIn(400);
                // After 7 seconds, remove the message
                setTimeout(function () {
                    successMessage.fadeOut(400);
                }, 7000);

                // Reduce the number of items in the cart (rendering)
                cartCount -= data.quantity_deleted;
                goodsInCartCount.text(cartCount);

                // Change the contents of the cart to the response from django (new rendered fragment of the cart markup)
                var cartItemsContainer = $("#cart-items-container");
                cartItemsContainer.html(data.cart_items_html);

            },

            error: function (data) {
                console.log("Error when adding a product to cart");
            },
        });
    });




    // // Теперь + - количества товара
    // // Обработчик события для уменьшения значения
    // $(document).on("click", ".decrement", function () {
    //     // Берем ссылку на контроллер django из атрибута data-cart-change-url
    //     var url = $(this).data("cart-change-url");
    //     // Берем id корзины из атрибута data-cart-id
    //     var cartID = $(this).data("cart-id");
    //     // Ищем ближайшеий input с количеством
    //     var $input = $(this).closest('.input-group').find('.number');
    //     // Берем значение количества товара
    //     var currentValue = parseInt($input.val());
    //     // Если количества больше одного, то только тогда делаем -1
    //     if (currentValue > 1) {
    //         $input.val(currentValue - 1);
    //         // Запускаем функцию определенную ниже
    //         // с аргументами (id карты, новое количество, количество уменьшилось или прибавилось, url)
    //         updateCart(cartID, currentValue - 1, -1, url);
    //     }
    // });

    // // Обработчик события для увеличения значения
    // $(document).on("click", ".increment", function () {
    //     // Берем ссылку на контроллер django из атрибута data-cart-change-url
    //     var url = $(this).data("cart-change-url");
    //     // Берем id корзины из атрибута data-cart-id
    //     var cartID = $(this).data("cart-id");
    //     // Ищем ближайшеий input с количеством
    //     var $input = $(this).closest('.input-group').find('.number');
    //     // Берем значение количества товара
    //     var currentValue = parseInt($input.val());

    //     $input.val(currentValue + 1);

    //     // Запускаем функцию определенную ниже
    //     // с аргументами (id карты, новое количество, количество уменьшилось или прибавилось, url)
    //     updateCart(cartID, currentValue + 1, 1, url);
    // });

    // function updateCart(cartID, quantity, change, url) {
    //     $.ajax({
    //         type: "POST",
    //         url: url,
    //         data: {
    //             cart_id: cartID,
    //             quantity: quantity,
    //             csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
    //         },

    //         success: function (data) {
    //              // Сообщение
    //             successMessage.html(data.message);
    //             successMessage.fadeIn(400);
    //              // Через 7сек убираем сообщение
    //             setTimeout(function () {
    //                  successMessage.fadeOut(400);
    //             }, 7000);

    //             // Изменяем количество товаров в корзине
    //             var goodsInCartCount = $("#goods-in-cart-count");
    //             var cartCount = parseInt(goodsInCartCount.text() || 0);
    //             cartCount += change;
    //             goodsInCartCount.text(cartCount);

    //             // Меняем содержимое корзины
    //             var cartItemsContainer = $("#cart-items-container");
    //             cartItemsContainer.html(data.cart_items_html);

    //         },
    //         error: function (data) {
    //             console.log("Ошибка при добавлении товара в корзину");
    //         },
    //     });
    // }

    // Take an element from layout by id - notification form django
    var notification = $('#notification');
    // After 7s remove
    if (notification.length > 0) {
        setTimeout(function () {
            notification.alert('close');
        }, 7000);
    }

// When you click on the shopping cart icon, a pop-up (modal) window opens
    $('#modalButton').click(function () {
        $('#exampleModal').appendTo('body');

        $('#exampleModal').modal('show');
    });

// Click on the button to close the cart windows
    $('#exampleModal .btn-close').click(function () {
        $('#exampleModal').modal('hide');
    });

    // Delivery method selection radio button event handler
    $("input[name='requires_delivery']").change(function() {
        var selectedValue = $(this).val();
        // Hide or show shipping address inputs
        if (selectedValue === "1") {
            $("#deliveryAddressField").show();
        } else {
            $("#deliveryAddressField").hide();
        }
    });
});