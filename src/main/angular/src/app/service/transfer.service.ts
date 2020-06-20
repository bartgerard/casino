import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Transfer} from '../model/transfer';
import {Slice} from '../common/model/slice';

@Injectable({
    providedIn: 'root'
})
export class TransferService {

    constructor(
        private _http: HttpClient
    ) {
    }

    findTransfersByUsername(
        username: string
    ): Observable<Transfer[]> {
        return this._http.get<Transfer[]>(
            environment.serverUrl + `/transfers/by-username/${username}`
        );
    }

    findTransfersByUsernameSliced(
        username: string,
        page: number = 0,
        size: number = 10
    ): Observable<Slice<Transfer[]>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this._http.get<Slice<Transfer[]>>(
            environment.serverUrl + `/transfers/by-username/${username}/sliced`,
            {
                params
            }
        );
    }

    transfer(
        transfer: Transfer
    ): Observable<any> {
        return this._http.post(
            `${environment.serverUrl}/transfers`,
            transfer
        );
    }

    delete(
        username: string,
        id: string
    ): Observable<void> {
        return this._http.delete<void>(
            environment.serverUrl + `/transfers/${username}/${id}`
        );
    }

}
