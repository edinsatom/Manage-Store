import { Action, createReducer, on } from "@ngrx/store";
import * as uiActions from "@common-module/store/ui.actions"

export interface UIState {
    isLoading: boolean;
}

export const initialState: UIState = {
    isLoading: false
}

const _uiReducer = createReducer(
    initialState,
    on(uiActions.loading, state => ({ ...state, isLoading: true })),
    on(uiActions.loadingSuccess, state => ({ ...state, isLoading: false })),
    
);

export function uiReducer(state: UIState | undefined, action: Action) {
    return _uiReducer(state, action);
}