import { HeroesService } from './../../services/heroes-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public hero!: Hero;

  constructor(private heroesService: HeroesService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.hero)
  }

   onDeleteHero(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.hero 
    });
  
   
    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result === true)
      )
      .subscribe(() => {
        this.heroesService.removeHero(this.hero.id);
        this.router.navigate(['/list']);
      });
  }
  

}
