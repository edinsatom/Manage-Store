import { Action, createReducer, on} from "@ngrx/store";
import { AppState } from "@root/app/app.reducer";

import { ProductModel } from "../models/product.model";
import * as productsActions from "./products.actions";

interface ProductsState {
    product: ProductModel | null;
    products: ProductModel[]
}

export interface AppStateWithProducts extends AppState {
    products: ProductsState
}

const initialState: ProductsState = {
    product: null,
    products: []
};

const _productsReducer = createReducer(
    initialState,
    
);

export function productsReducer(state:ProductsState, action:Action):any {
    return _productsReducer(state as ProductsState, action);
}