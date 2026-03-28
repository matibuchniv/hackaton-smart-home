package hackitba.app.service;

import hackitba.app.entitiy.VentanaIoTAdapter;
import org.springframework.stereotype.Service;

@Service
public class HomeAssistantVentanaAdapter implements VentanaIoTAdapter {

    private final String BASE_URL = "http://localhost:8123/api/services";
    private final String TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkNTY5YjlmYmU2Y2E0ZTFiODY1NmJhZDgwNjU0N2EwOCIsImlhdCI6MTc3NDcxOTk4OSwiZXhwIjoyMDkwMDc5OTg5fQ.JCnWP_3zRSuW8U_3vNnyS-EtScbwYQXmz1_UJqITBcc";

    public void abrir(String deviceId) {
        llamarServicio("cover/open_cover", deviceId);
    }

    public void cerrar(String deviceId) {
        llamarServicio("cover/close_cover", deviceId);
    }

    private void llamarServicio(String service, String entityId) {
        // podés usar RestTemplate o WebClient
    }
}