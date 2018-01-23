import { Injectable } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeartRateService {

  constructor(private ble: BluetoothCore) { }

  private HeartRatePrimaryService = 'heart_rate';
  private HeartRateCharacteristic = 'heart_rate_measurement';

  getBleDevice() {
    return this.ble.getDevice$();
  }

  streamValues() {
    return this.ble.streamValues$().map(value => this.parseHeartRate(value));
  }

  getHeartRate() {
    return this.ble
      .discover$({ filters: [{ services: [this.HeartRatePrimaryService] }] })
      .mergeMap(gatt => {
        let gattServer = gatt as BluetoothRemoteGATTServer;
        return this.ble.getPrimaryService$(gattServer, this.HeartRatePrimaryService)
      })
      .mergeMap(primaryService => this.ble.getCharacteristic$(primaryService, this.HeartRateCharacteristic))
      .mergeMap(characteristic => {
        let gattChar = characteristic as BluetoothRemoteGATTCharacteristic;
        return this.ble.readValue$(gattChar)
      })
      .map(value => this.parseHeartRate(value))
  }

  parseHeartRate(value: DataView): number {
    let flags = value.getUint8(0);
    let rate16Bits = flags & 0x1;
    if (rate16Bits) {
      return value.getUint16(1, true);
    }
    return value.getUint8(1);
  }
}
