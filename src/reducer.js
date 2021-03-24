export const initialState = {
    basket: [],
    user : null,
};

// Selector
export const getBasketTotal = (basket) => {
    return basket?.reduce((accumulator, item) => accumulator + item.price, 0);
}

const reducer = (state , action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket ,action.item]
            };
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index,1);
            }
            else {
                console.warn(`Cant remove product id ${action.id}` );
            }
            return {
                ...state,
                basket: newBasket
            };
        case 'SET_USER':
            return {
                ...state,
                user:action.user
            }
        case 'CLEAR_BASKET':
            return {
                ...state,
                basket:[]
            }
        default:
            return state;
    }
};

export default reducer;