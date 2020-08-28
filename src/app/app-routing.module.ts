import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EncountersComponent } from './components/encounters/encounters.component';
import { AddEncounterComponent } from './components/add-encounter/add-encounter.component';
import { SettingsComponent } from './components/settings/settings.component';


const routes: Routes = [
  {
    path: "home",
    component: DashboardComponent
  },
  {
    path: "encounters",
    component: EncountersComponent
  },
  {
    path: "add-encounter",
    component: AddEncounterComponent
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
