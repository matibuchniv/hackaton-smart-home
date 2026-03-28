package hackitba.app.service.service_respuesta;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import hackitba.app.service.WhatsAppAlertService;

@Component
public class EstrategiaRoja implements EstrategiaDeRespuesta {

    @Autowired
    private WhatsAppAlertService whatsAppAlertService;
    
    @Override
    public boolean aplica(Integer ultimaMedicion) {
        //HARDCODEADO HASTA IMPLEMENTAR
        // if (ultimaMedicion <= 800L) { return true;}    
        // else return false;
        return false;
    }

    @Override
    public void ejecutar(Integer ultimaMedicion) {
        whatsAppAlertService.sendAlert(ultimaMedicion);
    }
}


