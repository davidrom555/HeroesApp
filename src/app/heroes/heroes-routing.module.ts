import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HerolistComponent } from './pages/hero-list/hero-list.component';
import { DesignPageComponent } from './pages/design-page/design-page.component';

const routes: Routes = [
  {
    path: '',
    component: DesignPageComponent,
    children: [
      { path: 'heroes', component: HerolistComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
