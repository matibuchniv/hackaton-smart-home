package hackitba.app.service;

import hackitba.app.entitiy.VentanaIoTAdapter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class HomeAssistantVentanaAdapter implements VentanaIoTAdapter {

    @Value("${homeassistant.base-url:http://localhost:8123/api/services}")
    private String baseUrl;

    @Value("${homeassistant.token:}")
    private String token;

    public void abrir(String deviceId) {
        llamarServicio("cover/open_cover", deviceId);
    }

    public void cerrar(String deviceId) {
        llamarServicio("cover/close_cover", deviceId);
    }

    private void llamarServicio(String service, String entityId) {
        if (entityId == null || entityId.isEmpty()) {
            System.out.println("deviceId invalido, se ignora");
            return;
        }

        if (token == null || token.isBlank()) {
            System.out.println("Home Assistant token no configurado, se ignora la llamada");
            return;
        }

        RestTemplate restTemplate = new RestTemplate();
        String url = baseUrl + "/" + service;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String body = "{ \"entity_id\": \"" + entityId + "\" }";
        HttpEntity<String> request = new HttpEntity<>(body, headers);

        try {
            System.out.println("Llamando a Home Assistant: " + entityId);
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            System.out.println("Response Home Assistant: " + response.getStatusCode());
        } catch (Exception e) {
            System.out.println("Error en Home Assistant: " + e.getMessage());
        }
    }
}
