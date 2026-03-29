package hackitba.app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hackitba.app.entitiy.UserHome;
import hackitba.app.service.ServiceUserHome;
import hackitba.app.service.service_respuesta.ServiceRespuesta;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FrontEndController {

    private final ServiceUserHome userHomeService;
    private final ServiceRespuesta serviceRespuesta;
    
    @PostMapping("/onboard")
    public ResponseEntity<String> recibirDatosOnboard(@RequestBody UserHome userHome) {

        userHomeService.cargarUserHome(userHome);

        return ResponseEntity.ok("");
    }

    @GetMapping("/dispositivos")
    public ResponseEntity<List<String>> provideDevices() {

        return ResponseEntity.ok(serviceRespuesta.listaDispositivos());
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String,Object>> provideDashBoardData() {
        return ResponseEntity.ok(serviceRespuesta.generarDatosDashboard());
    }
}
