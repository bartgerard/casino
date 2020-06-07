import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayerComponent} from './component/player/player.component';
import {OverviewComponent} from './component/overview/overview.component';


const routes: Routes = [
    {path: '', component: PlayerComponent},
    {path: 'players', component: PlayerComponent},
    {path: 'overview', component: OverviewComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
