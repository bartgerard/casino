import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

    allPlayers(
        orderBy: string = 'SCORE'
    ): Observable<Player[]> {
        const params = new HttpParams()
            .set('orderBy', orderBy);

        return this._http.get<Player[]>(
            environment.serverUrl + '/players',
            {
                params
            }
        );
    }

    findPlayerByUsername(
        username: string
    ): Observable<Player> {
        return this._http.get<Player>(
            `${environment.serverUrl}/players/${username}`
        );
    }

    add(
        player: Player
    ): Observable<void> {
        return this._http.put<void>(
            `${environment.serverUrl}/players`,
            player
        );
    }

    remove(
        username: string
    ): Observable<void> {
        return this._http.delete<void>(
            `${environment.serverUrl}/players/${username}`
        );
    }

}
