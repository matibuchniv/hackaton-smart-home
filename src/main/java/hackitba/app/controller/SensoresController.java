package hackitba.app.controller;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hackitba.app.entitiy.MedicionCO2;
import hackitba.app.service.ServiceMedicionesCO2;
import hackitba.app.service.service_respuesta.ServiceRespuesta;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SensoresController {

    private final ServiceRespuesta serviceRespuesta;
    private final ServiceMedicionesCO2 serviceCO2; 

    @GetMapping("/")
    public String home() {
        return "hello world";
    }

    @PostMapping("/sensor-value")
    public String tomarMedicion(@RequestBody Integer medicionCO2) {

        MedicionCO2 medicion = new MedicionCO2(medicionCO2,LocalDateTime.now());

        serviceCO2.cargarMedicion(medicion);
        serviceRespuesta.evaluarRespuesta();

        return "ok";
    }

    @PostMapping("/person-status")
    public String actualizarPersonaPresente(@RequestBody boolean hayPersonas) {

        serviceRespuesta.setHayPersonas(hayPersonas);

        return "ok";
    }
    
}
