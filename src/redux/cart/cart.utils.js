export const addItemToCart = (cartItems, cartItemToAdd) => {
    // Find if a new item is alrady in the cart
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id);

    // If existed
    if (existingCartItem) {
        // Find out which item it is
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                // add quantity
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                // or just add an item
                : cartItem
        )
    } else {
        // return existing items + new item with a quantity value
        return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
    }
}