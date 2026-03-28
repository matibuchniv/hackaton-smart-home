from pathlib import Path
import time
import cv2
import requests
from ultralytics import YOLO

model_path = Path(__file__).resolve().parent / "model" / "best.pt"
model = YOLO(str(model_path))

JAVA_ENDPOINT = "http://localhost:8080/person-status"

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    raise RuntimeError("Could not open camera")

last_detection_time = None
last_person_value = False
post_sent = False

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame")
        break

    h, w, _ = frame.shape
    middle_x = w // 2

    cv2.line(frame, (middle_x, 0), (middle_x, h), (255, 0, 0), 2)

    results = model(frame, imgsz=640, conf=0.25, verbose=False)

    person_detected_this_frame = False

    for result in results:
        for box in result.boxes:
            cls_id = int(box.cls[0].item())
            class_name = model.names[cls_id]

            if class_name == "person":
                person_detected_this_frame = True

                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                center_x = (x1 + x2) // 2

                if center_x < middle_x:
                    last_person_value = True
                elif center_x > middle_x:
                    last_person_value = False

    if person_detected_this_frame:
        last_detection_time = time.time()
        post_sent = False

    if last_detection_time is not None and not post_sent:
        if time.time() - last_detection_time >= 5:
            try:
                print(last_person_value)
                response = requests.post(
                    JAVA_ENDPOINT,
                    json={"person": last_person_value},
                    timeout=5
                )
                print("Sent:", last_person_value, "status:", response.status_code)
                post_sent = True
            except requests.RequestException as e:
                print("Error sending POST:", e)

    cv2.imshow("Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()