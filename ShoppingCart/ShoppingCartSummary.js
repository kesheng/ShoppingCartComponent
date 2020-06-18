import React, { useContext } from "react";

import ShoppingCartContext from "./contexts/ShoppingCartContext";

const ShoppingCartSummary = () => {
    const { state } = useContext(ShoppingCartContext);

    return <React.Fragment>
        <div>
            <span>{ state.totalAddedItemsNum } items</span>
        </div>

        <div>
            {
                Object.entries(state.addedDietaries).map((dietaryArray) => {
                    return dietaryArray[1] > 0 ?
                        <React.Fragment key={Math.random()}>
                            {dietaryArray[1]}x <span className="dietary">{dietaryArray[0]}</span>
                        </React.Fragment>
                        :
                        null
                })
            }
        </div>
    </React.Fragment>
};

export default ShoppingCartSummary;