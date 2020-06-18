import React, { useContext } from "react";

import ShoppingCartContext from "./contexts/ShoppingCartContext";

const ShoppingCartItem = ({ item }) => {
    const { handleItemRemove } = useContext(ShoppingCartContext);

    const handleItemClickRemove = () => {
        handleItemRemove(item);
    };

    const dietaries = (item.dietaries && item.dietaries.length > 0) ?
        item.dietaries.map(dietary =>
            <span key={ Math.random() } className="dietary">{ dietary }</span>
        )
        :
        null;

    return <li className="item">
        <h2>{ item.name }</h2>
        <p>
            { dietaries }
        </p>
        <button className="remove-item" onClick={ handleItemClickRemove }>x</button>
    </li>
};

export default ShoppingCartItem;