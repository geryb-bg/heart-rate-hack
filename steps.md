1. Import Web Bluetooth
2. Add Web Bluetooth to imports
3. Create HeartRate service
4. Import BluetoothCore
5. Add constructor and private fields
6. Add parse heart rate method
7. Scafold methods
8. this.ble.getDevice$()
9. this.ble.streamValues$().map(value => this.parseHeartRate(value));
10. getHeartRate method observables
11. import heart rate service into module
12. add it to providers
13. import bluetooth core to component
14. import heart rate service to component
15. insert component constructor and fields -> add ref to subscription
16. insert on init on destroy and scaffold methods
17. implement get device status
18. implement update heart rate
19. add HTML
20. implement connectToDevice