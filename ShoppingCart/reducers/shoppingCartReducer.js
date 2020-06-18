import produce from "immer";

const addDietaries = (action, state, duplicate) => {
    let newDietaries = state.addedDietaries;
    if (!duplicate) {
        action.payload.item.dietaries.forEach(item => newDietaries[item] = (newDietaries[item] || 0) + 1);
    }

    let totalAddedDietaryNum = state.totalAddedDietaryNum;
    if (!duplicate) {
        totalAddedDietaryNum = 0;
        let newDietariesArray = Object.values(state.addedDietaries);
        newDietariesArray.forEach(dietaryNum => {
            totalAddedDietaryNum = totalAddedDietaryNum + dietaryNum;
        });
    }

    return { items: newDietaries, num: totalAddedDietaryNum };
};

const removeDietaries = (action, state) => {
    let newDietaries = { ...state.addedDietaries };
    action.payload.item.dietaries.forEach(item => newDietaries[item] = (newDietaries[item] > 0 ? newDietaries[item] - 1 : 0));

    let totalAddedDietaryNum = 0;
    let newDietariesArray = Object.values(newDietaries);
    newDietariesArray.forEach(dietaryNum => {
        totalAddedDietaryNum = totalAddedDietaryNum + dietaryNum;
    });

    return { items: newDietaries, num: totalAddedDietaryNum };
};

export const shoppingCartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ALL_ITEMS":
            return produce(state, draft => {
                let addedItems = [];
                let newDietaries = {};
                action.payload.items.forEach(item => {
                    item.dietaries.forEach(dietaryItem => newDietaries[dietaryItem] = (newDietaries[dietaryItem] || 0) + 1);

                    addedItems = addedItems.concat(item)
                });
                draft.addedItems = addedItems.sort();

                draft.totalAddedItemsNum = addedItems.length;

                draft.addedDietaries = newDietaries;

                let totalAddedDietariesNum = 0;
                let newDietariesArray = Object.values(newDietaries);
                newDietariesArray.forEach(dietaryNum => {
                    totalAddedDietariesNum = totalAddedDietariesNum + dietaryNum;
                });
                draft.totalAddedDietariesNum = totalAddedDietariesNum;
            });
        case "ADD_ITEM":
            return produce(state, draft => {
                let duplicate = false;

                let addedItems = state.addedItems.filter(item => {
                    if (item.id === action.payload.item.id) {
                        duplicate = true;
                    }

                    return item.id !== action.payload.item.id
                });
                addedItems = addedItems.concat(action.payload.item);
                draft.addedItems = addedItems.sort();

                draft.totalAddedItemsNum = addedItems.length;

                const dietaries = addDietaries(action, state, duplicate);
                draft.addedDietaries = dietaries.items;
                draft.totalAddedDietariesNum = dietaries.num;
            });
        case "REMOVE_ITEM":
            return produce(state, draft => {
                let addedItems = state.addedItems.filter(item => {
                    return item.id !== action.payload.item.id
                });
                draft.addedItems = addedItems.sort();

                draft.totalAddedItemsNum = addedItems.length;

                const dietaries = removeDietaries(action, state);
                draft.addedDietaries = dietaries.items;
                draft.totalAddedDietariesNum = dietaries.num;
            });
        default:
            return state;
    }
};