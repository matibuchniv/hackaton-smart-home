package hackitba.app.service.service_respuesta;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import hackitba.app.entitiy.UserHome;
import hackitba.app.service.WhatsAppAlertService;

@Component
public class EstrategiaRoja implements EstrategiaDeRespuesta {

    @Autowired
    private WhatsAppAlertService whatsAppAlertService;
    
    @Override
    public boolean aplica(Integer ultimaMedicion, UserHome userHome) {

        if (userHome.tieneFactorDeRiesgo()) 
            return (ultimaMedicion.compareTo(3000) >= 0);
        else 
            return (ultimaMedicion.compareTo(5000) >= 0);
    }

    @Override
    public void ejecutar(boolean hayPersonas) {
        whatsAppAlertService.sendRedAlert();
    }
}


