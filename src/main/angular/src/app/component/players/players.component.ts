import {Component, OnInit} from '@angular/core';
import {SubscribableService} from '../../common/service/subscribable.service';
import {Observable} from 'rxjs';
import {Player} from '../../model/player';
import {PlayerService} from '../../service/player.service';

@Component({
    selector: 'app-players',
    templateUrl: './players.component.html',
    styleUrls: ['./players.component.css']
})
export class PlayersComponent extends SubscribableService implements OnInit {

    players$: Observable<Player[]>;

    constructor(
        private playerService: PlayerService
    ) {
        super();
    }

    ngOnInit(): void {
        this.players$ = this.playerService.allPlayers();
    }

}
