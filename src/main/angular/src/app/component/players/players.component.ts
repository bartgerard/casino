import {Component, OnInit} from '@angular/core';
import {SubscribableService} from '../../common/service/subscribable.service';
import {Observable} from 'rxjs';
import {Player} from '../../model/player';
import {PlayerService} from '../../service/player.service';
import {OverviewService} from '../../service/overview.service';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.css']
})
export class PlayersComponent extends SubscribableService implements OnInit {

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
        this.players$ = this._playerService.allPlayers('NAME');
    }

}
