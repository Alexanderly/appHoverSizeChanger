import { Component } from '@angular/core';
import { HoverSizeChangerDirective } from './directives/hover-size-changer.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HoverSizeChangerDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  onGrow(size: string): void {
    console.log('Начал расти с размера:', size);
  }

  onReduce(size: string): void {
    console.log('Начал уменьшаться с размера:', size);
  }
}
