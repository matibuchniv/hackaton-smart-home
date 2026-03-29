package hackitba.app.service.service_respuesta;

import org.springframework.stereotype.Component;

import hackitba.app.entitiy.UserHome;
import hackitba.app.service.ServiceVentana;
import hackitba.app.service.WhatsAppAlertService;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EstrategiaNaranja implements EstrategiaDeRespuesta {

    private final WhatsAppAlertService whatsAppAlertService;
    private final ServiceVentana serviceVentana;
    
    @Override
    public boolean aplica(Integer ultimaMedicion, UserHome userHome) {

        if (userHome.tieneFactorDeRiesgo()) 
            return (ultimaMedicion.compareTo(1200) > 0 && ultimaMedicion.compareTo(3000) < 0);
        else 
            return (ultimaMedicion.compareTo(1500) > 0 && ultimaMedicion.compareTo(5000) < 0);
    }

    @Override
    public void ejecutar(boolean hayPersonas) {
        whatsAppAlertService.sendOrangeAlert();
        serviceVentana.abrirVentanas();
    }
}
