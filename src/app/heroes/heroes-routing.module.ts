import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HerolistComponent } from './pages/hero-list/hero-list.component';
import { DesignPageComponent } from './pages/design-page/design-page.component';
import { SearchHeroeComponent } from './pages/search-heroe/search-heroe.component';
import { NewHeroComponent } from './pages/new-hero/new-hero.component';

const routes: Routes = [
  {
    path: '',
    component: DesignPageComponent,
    children: [
      { path: 'list', component: HerolistComponent },
      { path: 'new-hero', component: NewHeroComponent },
      { path: 'search-hero', component: SearchHeroeComponent },
      { path: ':id', component: DesignPageComponent},
      { path: 'edit/:id', component: NewHeroComponent },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
