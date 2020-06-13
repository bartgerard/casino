import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './component/overview/overview.component';
import {PlayersComponent} from './component/players/players.component';
import {PlayerManagementComponent} from './component/player-management/player-management.component';


const routes: Routes = [
    {path: '', component: OverviewComponent},
    {path: 'players', component: PlayersComponent},
    {path: 'overview', component: OverviewComponent},
    {path: 'player-management', component: PlayerManagementComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
