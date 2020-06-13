import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Transfer} from '../model/transfer';

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

    transfer(
        transfer: Transfer
    ): Observable<any> {
        return this._http.post(
            `${environment.serverUrl}/transfers`,
            transfer
        );
    }

}
