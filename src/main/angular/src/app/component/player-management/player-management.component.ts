import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {PlayerService} from '../../service/player.service';
import {Player} from '../../model/player';
import {TransferService} from '../../service/transfer.service';
import {Transfer} from '../../model/transfer';
import {SubscribableService} from '../../common/service/subscribable.service';

@Component({
    selector: 'app-player-management',
    templateUrl: './player-management.component.html',
    styleUrls: ['./player-management.component.css']
})
export class PlayerManagementComponent extends SubscribableService implements OnInit {

    player: Player;

    increment: number = 1000;

    constructor(
        private _route: ActivatedRoute,
        private _playerService: PlayerService,
        private _transferService: TransferService,
    ) {
        super();
    }

    ngOnInit(): void {
        this._route.queryParamMap
            .pipe(map(params => params.get('username') || 'unknown'))
            .subscribe(username => this.retrievePlayer(username));
    }

    private retrievePlayer(
        username: string
    ) {
        this.subs.sink = this._playerService.findPlayerByUsername(username)
            .subscribe(player => {
                this.player = player;
                this.increment = player.lastUsedIncrement || 1000;
            });
    }

    add(
        amount: number
    ) {
        this._transferService.transfer(
            new Transfer(
                this.player.username,
                amount,
                this.increment
            )
        )
            .subscribe(val => this.retrievePlayer(this.player.username));
    }
}
