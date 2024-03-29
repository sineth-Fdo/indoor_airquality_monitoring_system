#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>
#include <WiFiClient.h>
#include <WiFi.h>
#include <ThingSpeak.h>
#include <FirebaseESP32.h>

#define CHANNEL_ID 2486725
#define CHANNEL_API_ "WSUK1KLEE098GWOS"

WiFiClient client;

#define WIFI_TIMEOUT_MS 20000
#define WIFI_NETWORK "Sineth"
#define WIFI_PASSWORD "B6912cD3"

#define DHTPIN 4      // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11 // DHT 11

#define MQ135_PIN 0  // Analog pin connected to the MQ135 sensor

DHT dht(DHTPIN, DHTTYPE);

// Set the I2C address of your LCD module (you may need to adjust this)
#define I2C_ADDRESS 0x27

#define FIREBASE_HOST "https://iotproject-3ecb9-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "AIzaSyDFEFKQ-Y9xRFy97PlD9WiZ5oZ4G6TF-LU"

FirebaseData firebaseData;
FirebaseConfig firebaseConfig;

// Create an instance of the LiquidCrystal_I2C class
LiquidCrystal_I2C lcd(I2C_ADDRESS, 20, 4); // Adjust the parameters if your LCD is different  pinMode(MQ135_PIN, INPUT);
void connectToWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_NETWORK, WIFI_PASSWORD);

  unsigned long startAttemptTime =millis();
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
}
void setup() {
  pinMode(MQ135_PIN, INPUT);
  Serial.begin(9600);
  Serial.println("Air Quality Monitoring");

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Air Quality ");
  lcd.setCursor(0, 2);
  lcd.print("Monitoring");
  delay(2000);
  dht.begin();

  connectToWiFi();
  ThingSpeak.begin(client);

    firebaseConfig.host = FIREBASE_HOST;
    firebaseConfig.signer.tokens.legacy_token = FIREBASE_AUTH;
    Firebase.begin(&firebaseConfig, nullptr);
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  float LPGLevel = analogRead(MQ135_PIN);
  if (isnan(LPGLevel))
  {
    Serial.println("Failed to read!");
    return;
  } // Read MQ135 sensor value

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    lcd.setCursor(0, 2);
    lcd.println("Failed");
    return; // Skip this reading if it's invalid
  }

  // Print current reading to LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Humidity: ");
  lcd.setCursor(9, 0);
  lcd.print(humidity);
  lcd.print("%");

  lcd.setCursor(0, 1);
  lcd.print("Temp:");
  lcd.setCursor(9, 1);
  lcd.print(temperature);
  lcd.print("C");

  // Determine LPG detection status
  String LPGStatus = (LPGLevel >= 2500) ? "Detected" : "No";

  // Print LPG detection status to LCD
  lcd.setCursor(0, 2);
  lcd.print("Harmful Gas: ");
  lcd.setCursor(0, 3);
  lcd.print(LPGStatus);

  // Print current reading to Serial for debugging
  Serial.print("Humidity:");
  Serial.print(humidity);
  Serial.print("%\t");
  Serial.print("Temperature:");
  Serial.print(temperature);
  Serial.print("C\t");
  Serial.print("harmful gas: ");
  Serial.println(LPGLevel);


  if (!Firebase.setFloat(firebaseData, "Air/Humidity", humidity)) {
    Serial.println("Failed to write to database");
    Serial.println("Reason: " + firebaseData.errorReason());
  }
  if (!Firebase.setFloat(firebaseData, "Air/Temperature", temperature)) {
    Serial.println("Failed to write to database");
    Serial.println("Reason: " + firebaseData.errorReason());
  }
  if (!Firebase.setFloat(firebaseData, "Air/Gas", LPGLevel)) {
    Serial.println("Failed to write to database");
    Serial.println("Reason: " + firebaseData.errorReason());
  }

  // Delay before starting the next round of readings

  
  ThingSpeak.setField(1, humidity);
  ThingSpeak.setField(2, temperature);

  ThingSpeak.writeFields(CHANNEL_ID, CHANNEL_API_);

  delay(15000);
}