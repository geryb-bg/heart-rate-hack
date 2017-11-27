import { Component, OnInit } from '@angular/core';
import { BluetoothCore } from '../../ng-bluetooth/angular-web-bluetooth';
import { HeartRateService } from './heart-rate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  heartRate: number;
  connected: boolean = false;
  device: any;

  constructor(public heartRateService: HeartRateService) { }

  ngOnInit() {
    this.getDeviceStatus();
    this.updateHeartRateValue();
  }

  getDeviceStatus() {
    this.heartRateService.getBleDevice().subscribe(
      (device) => {

        if (device) {
          this.device = device;
          this.connected = true;
        }
        else {
          this.device = null;
          this.connected = false;
        }
      }
    );
  }

  updateHeartRateValue() {
    this.heartRateService.streamValues().subscribe(x => this.heartRate = x);
  }

  connectToDevice() {
    return this.heartRateService.getHeartRate().subscribe(x => this.heartRate = x);
  }
}
