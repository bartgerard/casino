import {Component, OnInit} from '@angular/core';
import {OverviewService} from '../../service/overview.service';
import {SubscribableService} from '../../common/service/subscribable.service';
import {Player} from '../../model/player';
import {PlayerService} from '../../service/player.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent extends SubscribableService implements OnInit {

    data: string;
    players$: Observable<Player[]>;

    constructor(
        private _overviewService: OverviewService,
        private _playerService: PlayerService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.refresh();
        this.subs.sink = this._overviewService.events()
            .subscribe(event => {
                this.data = event.test;
                this.refresh();
            });
    }

    refresh(): void {
        this.players$ = this._playerService.allPlayers();
    }

}
