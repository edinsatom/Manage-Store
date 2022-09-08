import { Action, createReducer, on} from "@ngrx/store";
import { Product, ProductModel } from "../models/product.model";
import * as productsActions from "./products.actions";

interface ProductState {
    product: ProductModel | null;
    products: ProductModel[]
}

const initialState: ProductState = {
    product: null,
    products: []
};

const _productsReducer = createReducer(
    initialState,
    on(productsActions.addProduct, (state, { request }) => {
        const products = [...state.products];
        !!request.body ? products.push(request.body) : false

        
        
        return {
            ...state,
            products
        }
    }),
    on(productsActions.updateProduct, (state, { request }) => {
        const products = [...state.products];
        !!request.body ? products.push(request.body) : false
        return {
            ...state,
            products
        }
    }),
    on(productsActions.deleteProduct, (state, { product }) => {
        const products = state.products.filter(x => x.id != product.id)
        return {
            ...state,
            product,
            products
        }
    }),
    on(productsActions.resetProduct, (state) => initialState)
);

export function productsReducer(state:ProductState, action:Action):any {
    return _productsReducer(state as ProductState, action);
}