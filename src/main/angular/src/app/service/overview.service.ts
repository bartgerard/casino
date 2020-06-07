import {Injectable} from '@angular/core';
import {SseService} from '../common/service/sse.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {OverviewEvent} from '../model/overview-event';

@Injectable({
    providedIn: 'root'
})
export class OverviewService {

    constructor(
        private _sseService: SseService
    ) {
    }

    events(): Observable<OverviewEvent> {
        return this._sseService.getServerSentEvent<OverviewEvent>(
            environment.serverUrl + '/overview/events'
        );
    }

}
