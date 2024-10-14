import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HerolistComponent } from './hero-list/hero-list.component';

@NgModule({
  declarations: [HerolistComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeroesRoutingModule,
  ]
})
export class HeroesModule { }
