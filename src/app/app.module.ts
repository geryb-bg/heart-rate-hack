import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebBluetoothModule } from '../../ng-bluetooth/angular-web-bluetooth';

import { HeartRateService } from './heart-rate.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WebBluetoothModule.forRoot({
      enableTracing: true
    })
  ],
  providers: [HeartRateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
