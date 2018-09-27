import { Component } from '@angular/core';
import { STATISTICS } from './shared/statistics';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bar-chart';
  barData = STATISTICS;
}
