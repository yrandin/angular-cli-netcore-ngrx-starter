import { Injectable, InjectionToken, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, skip, takeUntil } from 'rxjs/operators';

import { WeatherForecast } from 'app/forecasts/models/weather-forecast';
import { ForecastsService } from 'app/forecasts/services/forecasts.service';
import * as forecastsActions from 'app/forecasts/store/actions';

@Injectable()
export class ForecastEffects {
  constructor(
    private actions$: Actions,
    private weatherService: ForecastsService,
    private snackBar: MatSnackBar,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType<forecastsActions.Load>(forecastsActions.ForecastActionTypes.Load)
    .pipe(
    map(action => action.payload),
    switchMap(count => this.runQuery(count))
    );

  @Effect()
  refresh$: Observable<Action> = this.actions$
    .ofType<forecastsActions.Refresh>(forecastsActions.ForecastActionTypes.Refresh)
    .pipe(
    map(action => action.payload),
    switchMap(count => this.runQuery(count))
    );

  runQuery(count: number) {
    const nextLoad$ = this.actions$.ofType(forecastsActions.ForecastActionTypes.Load).pipe(skip(1));
    const stateKey = makeStateKey('getWeather_' + count.toString());

    if (this.transferState.hasKey(stateKey)) {
      const weatherForecast = this.transferState.get<WeatherForecast[]>(stateKey, []);
      this.transferState.remove(stateKey);
      return of(new forecastsActions.LoadComplete(weatherForecast));
    } else {
      return this.weatherService
        .getWeather<WeatherForecast>(count)
        .pipe(
        takeUntil(nextLoad$),
        map((weatherForecast: WeatherForecast[]) => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set<WeatherForecast[]>(stateKey, weatherForecast);
          }
          return new forecastsActions.LoadComplete(weatherForecast);
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            const message = `ERROR: ${err.status} - ${err.statusText} - URL: ${err.url}`;
            this.snackBar.open(message, null, {
              duration: 6000,
            });
          }
          return of(new forecastsActions.LoadError(err));
        })
        );
    }
  }
}
