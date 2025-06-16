let cart = {};
        let cartTotal = 0;
        let cartItemCount = 0;

        function changeQuantity(ticketType, change) {
            const input = document.getElementById(ticketType + '-qty');
            let currentValue = parseInt(input.value);
            let newValue = Math.max(0, currentValue + change);
            input.value = newValue;
        }

        function addToCart(ticketType, ticketName, price) {
            const quantity = parseInt(document.getElementById(ticketType + '-qty').value);
            
            if (quantity === 0) {
                alert('Por favor selecciona una cantidad mayor a 0');
                return;
            }

            if (cart[ticketType]) {
                cart[ticketType].quantity += quantity;
            } else {
                cart[ticketType] = {
                    name: ticketName,
                    price: price,
                    quantity: quantity
                };
            }

            // Reset quantity selector
            document.getElementById(ticketType + '-qty').value = 0;
            
            updateCartDisplay();
            
            // Show success message
            alert(`¡${quantity} ${ticketName}(s) agregado(s) al carrito!`);
        }

        function removeFromCart(ticketType) {
            delete cart[ticketType];
            updateCartDisplay();
        }

        function updateCartDisplay() {
            const cartItemsContainer = document.getElementById('cart-items');
            const cartSummary = document.getElementById('cart-summary');
            const cartCount = document.getElementById('cart-count');
            
            cartItemCount = 0;
            cartTotal = 0;

            // Calculate totals
            for (let type in cart) {
                cartItemCount += cart[type].quantity;
                cartTotal += cart[type].price * cart[type].quantity;
            }

            // Update cart count
            cartCount.textContent = cartItemCount;

            if (cartItemCount === 0) {
                // Show empty cart
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Tu carrito está vacío</p>
                        <p>¡Agrega algunas entradas para comenzar!</p>
                    </div>
                `;
                cartSummary.style.display = 'none';
            } else {
                // Show cart items
                let cartHTML = '';
                for (let type in cart) {
                    const item = cart[type];
                    const itemTotal = item.price * item.quantity;
                    cartHTML += `
                        <div class="cart-item">
                            <div class="cart-item-info">
                                <div class="cart-item-name">${item.name}</div>
                                <div>Cantidad: ${item.quantity} × $${item.price} = <span class="cart-item-price">$${itemTotal}</span></div>
                            </div>
                            <button class="remove-btn" onclick="removeFromCart('${type}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                }
                cartItemsContainer.innerHTML = cartHTML;

                // Show summary
                const taxes = Math.round(cartTotal * 0.08 * 100) / 100;
                const total = cartTotal + taxes;

                document.getElementById('subtotal').textContent = `$${cartTotal}`;
                document.getElementById('taxes').textContent = `$${taxes}`;
                document.getElementById('total').textContent = `$${total}`;

                cartSummary.style.display = 'block';
                document.getElementById('checkout-btn').disabled = false;
            }
        }

        // Checkout functionality
        document.getElementById('checkout-btn').addEventListener('click', function() {
            if (cartItemCount > 0) {
                alert('¡Gracias por tu compra! Redirigiendo al procesamiento de pago...');
                // Here you would typically redirect to a payment processor
            }
        });