import { createAction, props } from "@ngrx/store";
import { IUserModel } from "src/app/common-module/models/user.model";


export const isAuth = createAction(
    '[Auth] Set auth',
    props<{ isAuth: boolean }>()
)

export const setUser = createAction(
    '[Auth] Set user',
    props<{ user: IUserModel }>()
);

export const unSetUser = createAction('[Auth] Unset User')