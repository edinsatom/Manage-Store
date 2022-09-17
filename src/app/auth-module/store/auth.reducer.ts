import { Action, createReducer, on } from "@ngrx/store";
import { FireUser } from "@common-module/models/user.model";
import * as authActions from "@auth-module/store/auth.actions"

export interface AuthState {
    user: FireUser | null;
    isAuth: boolean;
}

export const initialState: AuthState = {
    user: null,
    isAuth: false
}

const _functionReducer = createReducer(
    initialState,
    on(authActions.setUser, (state, {user}) => ({ ...state, user: {...user} })),
    
    on(authActions.unSetUser, (state) => ({ ...state, user: null })),

    on(authActions.isAuth, (state, {isAuth}) => ({ ...state, isAuth })),

);

export function authReducer(state: AuthState | undefined, action: Action) {
    return _functionReducer(state, action);
}