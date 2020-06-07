import {OnDestroy} from '@angular/core';
import {SubSink} from 'subsink';

export abstract class SubscribableService implements OnDestroy {

    protected constructor(
        protected subs = new SubSink()
    ) {
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

}
