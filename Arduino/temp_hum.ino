#include "DHT.h"
#define DHTPIN 13
#define DHTTYPE DHT11   

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
//  Serial.println("DHTxx test!");

  dht.begin();
}

void loop() {
  delay(5000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  if (isnan(h) || isnan(t) || isnan(f)) {
//    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  float hif = dht.computeHeatIndex(f, h);
  float hic = dht.computeHeatIndex(t, h, false);

//  printf("{\\\"temp\\\": %f", t);
  
// char test2[] = test.concat();
Serial.print("{");
Serial.print("'temp': ");
Serial.print(t);
Serial.print(", ");
Serial.print("'hum': ");
Serial.print(h);
Serial.print(", ");
Serial.print("'hi': ");
Serial.print(hic);
Serial.println("}");
 

//  TODO: Implement LED screen
delay(5000);
}
