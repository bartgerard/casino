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
    transfers: Transfer[] = [];

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

        this.subs.sink = this._transferService.findTransfersByUsername(
            username
        )
            .subscribe(transfers => {
                this.transfers = transfers;
            });
    }

    add(
        amount: number
    ) {
        this._transferService.transfer(
            new Transfer(
                null,
                this.player.username,
                amount,
                this.increment,
                null
            )
        )
            .subscribe(val => this.retrievePlayer(this.player.username));
    }

    deleteTransfer(
        id: string
    ) {
        this._transferService.delete(
            this.player.username,
            id
        )
            .subscribe(() => this.retrievePlayer(this.player.username));
    }
}
