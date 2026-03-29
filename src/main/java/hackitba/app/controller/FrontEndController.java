package hackitba.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hackitba.app.entitiy.UserHome;
import hackitba.app.service.ServiceUserHome;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FrontEndController {

    private final ServiceUserHome userHomeService;
    
    @PostMapping("/onboard")
    public ResponseEntity<String> recibirDatosOnboard(@RequestBody UserHome userHome) {

        userHomeService.cargarUserHome(userHome);

        return ResponseEntity.ok("");
    }
}
