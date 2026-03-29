package hackitba.app.service.service_respuesta;

import org.springframework.stereotype.Component;

import hackitba.app.entitiy.UserHome;
import hackitba.app.service.ServiceVentana;
import hackitba.app.service.WhatsAppAlertService;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EstrategiaAmarilla implements EstrategiaDeRespuesta {

    private final WhatsAppAlertService whatsAppAlertService;
    private final ServiceVentana serviceVentana;
    
    @Override
    public boolean aplica(Integer ultimaMedicion, UserHome userHome) {

        if (userHome.tieneFactorDeRiesgo()) 
            return (ultimaMedicion.compareTo(700) >= 0 && ultimaMedicion.compareTo(1200) <= 0);
        else 
            return (ultimaMedicion.compareTo(800) >= 0 && ultimaMedicion.compareTo(1500) <= 0);
    }

    @Override
    public void ejecutar(boolean hayPersonas) {
        whatsAppAlertService.sendYellowAlert();
        serviceVentana.abrirVentanas();
    }
}
