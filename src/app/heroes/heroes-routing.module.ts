import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HerolistComponent } from './pages/hero-list/hero-list.component';
import { DesignPageComponent } from './pages/design-page/design-page.component';
// localhost:4200/heroes
const routes: Routes = [
  {
    path: '',
    component: DesignPageComponent,
    children: [
      { path: 'list', component: HerolistComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
