import time
import requests

JAVA_ENDPOINT = "http://localhost:8080/sensor-value"

values = [
    400,
    450,
    475,
    550,
    550,
    660,
    800,
    950,
    1000,
    1100,
    1200,
    1250,
    1255,
    1300,
    1500,
    1700,
    1750,
    1800,
    1900,
    2000,
    2500,
    3000,
    5000,
    40000
]

for value in values:
    try:
        response = requests.post(
            JAVA_ENDPOINT,
            json={"value": value},
            timeout=5
        )
        print(f"Sent {value}, status={response.status_code}")
    except requests.RequestException as e:
        print(f"Error sending {value}: {e}")

    time.sleep(5)