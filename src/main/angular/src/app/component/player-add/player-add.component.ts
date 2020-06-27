import {Component, OnInit} from '@angular/core';
import {PlayerService} from '../../service/player.service';
import {Player} from '../../model/player';

@Component({
    selector: 'app-player-add',
    templateUrl: './player-add.component.html',
    styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {

    player: Player = new Player();

    constructor(
        private _playerService: PlayerService,
    ) {
    }

    ngOnInit(): void {
    }

    handleAdd() {
        this._playerService.add(this.player)
            .subscribe(x => this.player = new Player());
    }

    handleRemove() {
        this._playerService.remove(this.player.username)
            .subscribe(x => this.player = new Player());
    }

}
