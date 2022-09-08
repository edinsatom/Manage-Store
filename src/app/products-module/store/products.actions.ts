import { createAction, props } from "@ngrx/store";
import { ProductModel } from "../models/product.model";
import { RequestModel } from "src/app/common-module/models/request.model";


export const addProduct = createAction(
    '[Products] Add product',
    props<{ request: RequestModel<ProductModel> }>()
);
export const updateProduct = createAction(
    '[Products] Upudate product',
    props<{ request: RequestModel<ProductModel> }>()
);
export const deleteProduct = createAction(
    '[Products] Delete product',
    props<{ product: ProductModel }>()
);
export const resetProduct = createAction(
    '[Products] Reset product'
);
