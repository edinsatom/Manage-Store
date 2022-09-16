import { ActionReducerMap } from "@ngrx/store";
import * as auth from "./auth-module/store/auth.reducer";
import * as ui from './common-module/store/ui.reducer';

export interface AppState {
    ui: ui.UIState,
    auth: auth.AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    auth: auth.authReducer
}