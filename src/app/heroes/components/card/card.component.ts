import { HeroesService } from './../../services/heroes-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { filter, Observable, switchMap } from 'rxjs';
import { LoadingService } from '../../services/loading-service.service';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public hero!: Hero;
  public loading$: Observable<boolean>;
  
  constructor(private heroesService: HeroesService,
    private router: Router, private dialog: MatDialog,
    private loadingService: LoadingService) {
      this.loading$ = this.loadingService.loading$;
     }

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
        this.loadingService.showLoading(); // Mostrar el loader
        this.heroesService.removeHero(this.hero.id);
        this.router.navigate(['/list']);
      });
  }
  

}
