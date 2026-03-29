package hackitba.app.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hackitba.app.dto.RequestHayGente;
import hackitba.app.service.service_respuesta.ServiceRespuesta;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HayGenteController {

    private final ServiceRespuesta serviceRespuesta; 

    @PostMapping("/hayGente")
    public ResponseEntity<String> hayGente(@RequestBody RequestHayGente hayGente) {
        serviceRespuesta.setHayPersonas(hayGente.getPerson());
    return ResponseEntity.ok("recibido: " + hayGente.getPerson());
}

    @GetMapping("/hayGente")
    public boolean actualizarPersonaPresente() {

        boolean hayPersonas = serviceRespuesta.getHayPersonas();

        return hayPersonas;
    }
    
}
