import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PageContainerComponent } from '@myorg/common';
import { PageToolbarComponent } from '@myorg/common/page-toolbar';
import { PageToolbarButtonComponent } from '@myorg/common/page-toolbar-button';

import { LayoutFacade } from '../../../core/store/facades/layout.facade';
import { WeatherForecastService } from '../../../weather-forecast/services/weather-forecast.service';
import { ForecastTableComponent } from '../../components/forecast-table/forecast-table.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PageContainerComponent,
    PageToolbarButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    PageToolbarComponent,
    MatIconModule,
    ForecastTableComponent,
  ],
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FetchDataComponent implements OnInit {
  constructor(
    public layoutFacade: LayoutFacade,
    public weatherForecastService: WeatherForecastService,
  ) {}

  ngOnInit() {
    this.layoutFacade.setTitle('Weather Forecasts');
  }

  getForecasts(count: number) {
    this.weatherForecastService.refresh(count);
  }
}
