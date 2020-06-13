import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {PlayerService} from '../../service/player.service';
import {Player} from '../../model/player';

@Component({
    selector: 'app-player-management',
    templateUrl: './player-management.component.html',
    styleUrls: ['./player-management.component.css']
})
export class PlayerManagementComponent implements OnInit {

    player: Player;

    constructor(
        private _route: ActivatedRoute,
        private _playerService: PlayerService
    ) {
    }

    ngOnInit(): void {
        this._route.queryParamMap
            .pipe(map(params => params.get('username') || 'unknown'))
            .subscribe(username => this._playerService.findPlayerByUsername(username)
                .subscribe(player => this.player = player)
            );
    }

}
