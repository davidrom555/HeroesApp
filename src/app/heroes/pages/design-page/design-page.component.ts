import { Component } from '@angular/core';

@Component({
  selector: 'design-page',
  templateUrl: './design-page.component.html',
  styleUrls: ['./design-page.component.scss']
})
export class DesignPageComponent {

  public sidebarOptions = [
    { label: 'Héroes', icon: 'label', url: './list' },
    { label: 'Nuevo Héroe', icon: 'add', url: './new-hero' },
  ]
}
