import React, {useReducer, useContext} from 'react';
import { createContext } from 'react';


const initialState = {
    selectedItems: [],
    itemsCounter : 0,
    total: 0,
    checkOut: false

}

const sumItems = items => {
    const itemsCounter = items.reduce((total, product) => total + product.quantity, 0);
    const total = items.reduce((total, product)=> total + product.price*product.quantity,0);
    return {itemsCounter, total}
}



const cartReducer = (state, action) => {
    console.log(state)
    switch(action.type) {
        case "ADDITEM" :
            if(!state.selectedItems.find(item => item.id === action.payload.id )) {
                state.selectedItems.push({
                        ...action.payload,
                        quantity: 1

                    })
            }
            return {
                ...state,
                selectedItems: [...state.selectedItems],
                ...sumItems(state.selectedItems),

            }

        case "REMOVE-ITEM" :
            const newSelectedItems = state.selectedItems.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                selectedItems : [...newSelectedItems],
                ...sumItems(state.selectedItems),
            }

        case "INCREASE" :
            const indexI = state.selectedItems.findIndex(item => item.id === action.payload.id );
            state.selectedItems[indexI].quantity++;
            return {
                ...state,
                ...sumItems(state.selectedItems),
            }
        case "DECREASE" :
                const indexD = state.selectedItems.findIndex(item => item.id === action.payload.id );
                state.selectedItems[indexD].quantity--;
                return {
                    ...state,
                    ...sumItems(state.selectedItems),
                }
        case "CHECKOUT" :
            return {
                selectedItems: [],
                itemsCounter : 0,
                total: 0,
                checkOut: true
            }

        case "CLEAR" :
            return  {
                selectedItems: [],
                itemsCounter : 0,
                total: 0,
                checkOut: false
            }
    }
}


export const cartContext = createContext();


const CartContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, initialState)



    return (
        <cartContext.Provider value={{state, dispatch}}>
            {children}
        </cartContext.Provider>
    );
};

export default CartContextProvider;