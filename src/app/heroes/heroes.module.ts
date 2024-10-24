import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HerolistComponent } from './pages/hero-list/hero-list.component';
import { SharedModule } from '../shared/shared.module';
import { DesignPageComponent } from './pages/design-page/design-page.component';
import { SearchHeroeComponent } from './pages/search-heroe/search-heroe.component';
import { NewHeroComponent } from './pages/new-hero/new-hero.component';
import { CardComponent } from './components/card/card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { UppercaseDirective } from './directives/uppercase.directive';


@NgModule({
  declarations: [
    HerolistComponent,
    DesignPageComponent,
    NewHeroComponent,
    SearchHeroeComponent,
    CardComponent,
    HeroImagePipe,
    CardComponent,
    ConfirmDialogComponent,
    UppercaseDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeroesRoutingModule,
    SharedModule
  ]
})
export class HeroesModule { }
