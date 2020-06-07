import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../../service/player.service';
import {Observable} from 'rxjs';
import {Player} from '../../model/player';
import {SubscribableService} from '../../common/service/subscribable.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent extends SubscribableService implements OnInit {

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
