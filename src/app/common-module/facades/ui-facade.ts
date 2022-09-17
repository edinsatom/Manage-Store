import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as actions from "@common-module/store/ui.actions";
import { AppState } from "@root/app/app.reducer";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class UiFacade {
    constructor(
        private store:Store<AppState>
    ) { }

    initLoading(): void{
        this.store.dispatch(actions.loading());
    }

    stopLoading(): void{
        this.store.dispatch(actions.loadingSuccess());
    }

    getLoading(): Observable<boolean>{
        return this.store.select('ui').pipe(
            map( resp => resp.isLoading)
        )
    }
}