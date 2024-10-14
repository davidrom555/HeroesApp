import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HerolistComponent } from './pages/hero-list/hero-list.component';
import { SharedModule } from '../shared/shared.module';
import { DesignPageComponent } from './pages/design-page/design-page.component';
import { NewHeroeComponent } from './pages/new-heroe/new-heroe.component';
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import { SearchHeroeComponent } from './pages/search-heroe/search-heroe.component';

@NgModule({
  declarations: [
    HerolistComponent,
    DesignPageComponent,
    NewHeroeComponent,
    HeroDetailComponent,
    SearchHeroeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeroesRoutingModule,
    SharedModule
  ]
})
export class HeroesModule { }
