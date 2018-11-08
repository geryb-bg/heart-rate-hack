import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeartRateService } from './heart-rate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  heartRate: number;
  connected: boolean = false;

  private subscription: Subscription = new Subscription();;

  constructor(public heartRateService: HeartRateService) { }

  ngOnInit() {
    this.getDeviceStatus();
    this.updateHeartRateValue();
  }

  getDeviceStatus() {
    const deviceSubscription = this.heartRateService.getBleDevice()
      .subscribe((device) => {
        if (device) {
          this.connected = true;
        }
        else {
          this.connected = false;
        }
      });
    this.subscription.add(deviceSubscription);
  }

  updateHeartRateValue() {
    const streamSubscription = this.heartRateService.streamValues()
      .subscribe(x => {
        this.heartRate = x;
        console.log(x);
      });
    this.subscription.add(streamSubscription);
  }

  connectToDevice() {
    const deviceSubscription = this.heartRateService.getHeartRate()
      .subscribe(x => this.heartRate = x);
    this.subscription.add(deviceSubscription);
    return deviceSubscription;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
