
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




    //  + - quantity of goods
    // Event handler for decreasing the value
    $(document).on("click", ".decrement", function () {
        // Take the link to the django controller from the data-cart-change-url attribute
        var url = $(this).data("cart-change-url");
        // Take the cart id from the data-cart-id attribute
        var cartID = $(this).data("cart-id");
        // Look for the nearest input with the quantity
        var $input = $(this).closest('.input-group').find('.number');
        // Take the value of the quantity of goods
        var currentValue = parseInt($input.val());
        // If the number of quantities is greater than one, only then do -1
        if (currentValue > 1) {
            $input.val(currentValue - 1);
            // Run the function defined below
            // with arguments (card id, new quantity, quantity decreased or increased, url)
            updateCart(cartID, currentValue - 1, -1, url);
        }
    });

    // Event handler for increasing the value
    $(document).on("click", ".increment", function () {
        // Take the link to the django controller from the data-cart-change-url attribute
        var url = $(this).data("cart-change-url");
        // Take the cart id from the data-cart-id attribute
        var cartID = $(this).data("cart-id");
        // Look for the nearest input with the quantity
        var $input = $(this).closest('.input-group').find('.number');
        // Take the value of the quantity of goods
        var currentValue = parseInt($input.val());

        $input.val(currentValue + 1);

        // Run the function defined below
        // with arguments (card id, new quantity, quantity decreased or increased, url)
        updateCart(cartID, currentValue + 1, 1, url);
    });

    function updateCart(cartID, quantity, change, url) {
        $.ajax({
            type: "POST",
            url: url,
            data: {
                cart_id: cartID,
                quantity: quantity,
                csrfmiddlewaretoken: $("[name=csrfmiddlewaretoken]").val(),
            },

            success: function (data) {
                 // Message
                successMessage.html(data.message);
                successMessage.fadeIn(400);
                 // After 7 seconds, clear the message
                setTimeout(function () {
                     successMessage.fadeOut(400);
                }, 7000);

                // Change the number of items in the cart
                var goodsInCartCount = $("#goods-in-cart-count");
                var cartCount = parseInt(goodsInCartCount.text() || 0);
                cartCount += change;
                goodsInCartCount.text(cartCount);

                // Change the contents of the shopping cart
                var cartItemsContainer = $("#cart-items-container");
                cartItemsContainer.html(data.cart_items_html);

            },
            error: function (data) {
                console.log("Ошибка при добавлении товара в корзину");
            },
        });
    }

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