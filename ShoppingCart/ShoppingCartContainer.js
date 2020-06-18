import React, { useEffect, useCallback, useMemo, useRef, useReducer } from "react";

import ShoppingCartContext from "./contexts/ShoppingCartContext";
import { shoppingCartReducer } from "./reducers/shoppingCartReducer";

import ShoppingCartItem from "./ShoppingCartItem";
import ShoppingCartSummary from "./ShoppingCartSummary";

const initialState = {
    addedItems: [],
    addedDietaries: {},
    totalAddedItemsNum: 0,
    totalAddedDietariesNum: 0
};

const ShoppingCartContainer = ({ children, shoppingCartItems, shoppingCartItemsUpdate }) => {console.log('Shopping cart');
    const [state, dispatch] = useReducer(shoppingCartReducer, initialState);
    const updateCallback = useRef(false);

    useEffect(
        () => {console.log('add all items');
            dispatch({
                type: "ADD_ALL_ITEMS",
                payload: {
                    items: shoppingCartItems
                }
            });
        },
        [JSON.stringify(shoppingCartItems)]
    );

    const firstLoad = useRef(true);
    useEffect(
        () => {
            if (!firstLoad.current) {console.log('update shopping cart');
                if (updateCallback.current) {
                    shoppingCartItemsUpdate(state.addedItems);
                    updateCallback.current = false;
                }
            }

            firstLoad.current = false;
        },
        [JSON.stringify(state.addedItems)]
    );

    const handleItemRemove = useCallback(
        (item) => {console.log('remove item');
            dispatch({
                type: "REMOVE_ITEM",
                payload: {
                    item: {
                        id: item.id,
                        name: item.name,
                        dietaries: item.dietaries
                    }
                }
            });

            updateCallback.current = true;
        },
        []
    );

    const contextValue = useMemo(
        () => {console.log('context update');
            return { state, dispatch };
        },
        [state, dispatch]
    );


    return <ShoppingCartContext.Provider value={{ ...contextValue, handleItemRemove }}>
        { children }
    </ShoppingCartContext.Provider>
};

ShoppingCartContainer.Item = ShoppingCartItem;
ShoppingCartContainer.Summary = ShoppingCartSummary;

export default ShoppingCartContainer;