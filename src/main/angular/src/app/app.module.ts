import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlayerComponent} from './component/player/player.component';
import {HttpClientModule} from '@angular/common/http';
import { OverviewComponent } from './component/overview/overview.component';

@NgModule({
    declarations: [
        AppComponent,
        PlayerComponent,
        OverviewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
