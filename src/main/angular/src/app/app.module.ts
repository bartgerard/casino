import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlayerComponent} from './component/player/player.component';
import {HttpClientModule} from '@angular/common/http';
import {OverviewComponent} from './component/overview/overview.component';
import {PlayersComponent} from './component/players/players.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {PlayerManagementComponent} from './component/player-management/player-management.component';

@NgModule({
    declarations: [
        AppComponent,
        PlayerComponent,
        OverviewComponent,
        PlayersComponent,
        HeaderComponent,
        FooterComponent,
        PlayerManagementComponent,
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
