import { createAction, props } from "@ngrx/store";
import { FireUser, UserModel } from "src/app/common-module/models/user.model";


export const setUser = createAction(
    '[Auth] Set user',
    props<{ user: FireUser }>()
);

export const unSetUser = createAction('[Auth] Unset User')