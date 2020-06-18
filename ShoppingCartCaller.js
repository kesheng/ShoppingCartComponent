/** example to call shopping cart component **/
import React, { useState, useCallback } from "react";
import ShoppingCart from "./../components/ShoppingCart/ShoppingCart";

const cartItems = [
    {
        id: 1001,
        name: 'Kale Caesar Pasta, Turmeric Satay Broccoli & Lemon Cashew Greens',
        dietaries: ['v', 've', 'df', 'gf', 'n!'],
    },
    {
        id: 1002,
        name: 'Hake & Smoky Chickpeas, Brown Rice & Quinoa, Roasted Roots',
        dietaries: ['gf', 'df', 'rsf'],
    },
];

const CartWithProps = () => {
    const [shoppingCartItems, setShoppingCartItems] = useState(cartItems);

    const shoppingCartItemsUpdate = useCallback(
        (data) => {
            console.log("updated", data);
            setShoppingCartItems(data);
        },
        []
    );

    return <ShoppingCart
        shoppingCartItems={ shoppingCartItems }
        shoppingCartItemsUpdate={ shoppingCartItemsUpdate }
    />;
};