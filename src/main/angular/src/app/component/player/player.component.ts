import {Component, Input, OnInit} from '@angular/core';
import {PlayerService} from '../../service/player.service';
import {Player} from '../../model/player';
import {SubscribableService} from '../../common/service/subscribable.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent extends SubscribableService implements OnInit {

    @Input('position')
    public position: number;

    @Input('player')
    public player: Player;

    constructor(
        private _playerService: PlayerService,
        private _router: Router
    ) {
        super();
    }

    ngOnInit(): void {
    }

    select(
        $event: MouseEvent,
        player: Player
    ) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                'username': player.username
            }
        }

        this._router.navigate(['/player-management'], navigationExtras).then();
    }

}
