package hackitba.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FrontEndController {
    
    @PostMapping("/onboard")
    public ResponseEntity<String> recibirDatosOnboard() {
        return ResponseEntity.ok("");
    }
}
