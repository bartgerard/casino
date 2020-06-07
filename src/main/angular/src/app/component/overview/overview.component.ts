import {Component, OnInit} from '@angular/core';
import {OverviewService} from '../../service/overview.service';
import {SubscribableService} from '../../common/service/subscribable.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent extends SubscribableService implements OnInit {

    data: string;

    constructor(
        private _overviewService: OverviewService
    ) {
        super();
    }

    ngOnInit(): void {
        this.subs.sink = this._overviewService.events()
            .subscribe(event => {
                this.data = event.test;
            });
    }

}
