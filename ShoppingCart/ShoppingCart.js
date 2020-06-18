import React from "react";
import PropTypes from "prop-types";

import ShoppingCartContainer from "./ShoppingCartContainer";

import "./css/cart.css";

// Use compound component pattern in here
const ShoppingCart = ({ shoppingCartItems, shoppingCartItemsUpdate }) => {console.log('Shopping cart container');
    return !shoppingCartItems ?
        null
        :
        <ShoppingCartContainer
            shoppingCartItemsUpdate={ shoppingCartItemsUpdate }
            shoppingCartItems={ shoppingCartItems }
        >
            <h2>Shopping Cart</h2>
            <ul className="menu-preview">
            {
                shoppingCartItems.map(item => {
                    return <ShoppingCartContainer.Item key={ item.id } item={item} />
                })
            }
            </ul>

            <div className="menu-preview">
                <ShoppingCartContainer.Summary />
            </div>
        </ShoppingCartContainer>
};

ShoppingCart.defaultProps = {
    shoppingCartItems: [
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
        {
            id: 1003,
            name: 'Dill & Swiss Chard Potato Cakes, Summer Tabbouleh & Roasted Roots',
            dietaries: ['gf', 'df', 'v', 've', 'n!'],
        },
    ],
    shoppingCartItemsUpdate: (data) => {
        // need to refresh shoppingCartItems to re-render the page, check CartWithProps
        console.log("updated", data);
    },
};

ShoppingCart.propTypes = {
    shoppingCartItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            dietaries: PropTypes.arrayOf(PropTypes.string).isRequired
        })
    ),
    shoppingCartItemsUpdate: PropTypes.func,
};

export default ShoppingCart;