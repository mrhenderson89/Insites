import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TabNavigationService {

    observers: any[];
    constructor() {
        this.observers = [];
    }

    addObserver(obs: any) {
        this.observers.push(obs);
    }

    changeTab(newTabIndex: number) {
        console.dir(this.observers);
        for(let i = 0; i < this.observers.length; i++) {
            const obs = this.observers[i];
            obs.next(newTabIndex);
        }
    }
}