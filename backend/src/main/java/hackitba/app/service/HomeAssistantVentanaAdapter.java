package hackitba.app.service;

import hackitba.app.entitiy.VentanaIoTAdapter;
import org.springframework.stereotype.Service;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

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
    if (entityId == null || entityId.isEmpty()) {
        System.out.println("⚠️ deviceId inválido, se ignora");
        return;
    }

    RestTemplate restTemplate = new RestTemplate();
    String url = BASE_URL + "/" + service;

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + TOKEN);
    headers.setContentType(MediaType.APPLICATION_JSON);

    String body = "{ \"entity_id\": \"" + entityId + "\" }";

    HttpEntity<String> request = new HttpEntity<>(body, headers);

    try {
        System.out.println("➡️ Llamando a HA: " + entityId);

        ResponseEntity<String> response =
                restTemplate.postForEntity(url, request, String.class);

        System.out.println("✅ Response: " + response.getStatusCode());

    } catch (Exception e) {
        System.out.println("❌ Error en Home Assistant: " + e.getMessage());
    }
}
}