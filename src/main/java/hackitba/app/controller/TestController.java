package hackitba.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import hackitba.app.service.WhatsAppAlertService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final WhatsAppAlertService whatsAppAlertService;

    @GetMapping("/mensaje")
    public String enviarMensaje() {
        whatsAppAlertService.sendAlert(8000L);
        return "mensaje enviado";
    }
    
}
