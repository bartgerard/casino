import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from '../model/player';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    constructor(
        private _http: HttpClient
    ) {
    }

    allPlayers(): Observable<Player[]> {
        return this._http.get<Player[]>(
            environment.serverUrl + '/players'
        );
    }

}
