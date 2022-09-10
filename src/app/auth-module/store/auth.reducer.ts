import { Action, createReducer, on } from "@ngrx/store";
import { FireUser } from "src/app/common-module/models/user.model";
import * as authActions from "./auth.actions"

export interface AuthState {
    user: FireUser | null;
}

export const initialState: AuthState = {
    user: null
}

const _functionReducer = createReducer(
    initialState,
    on(authActions.setUser, (state, {user}) => ({ ...state, user: {...user} })),
    
    on(authActions.unSetUser, (state) => ({ ...state, user: null })),
    

);

export function authReducer(state: AuthState | undefined, action: Action) {
    return _functionReducer(state, action);
}