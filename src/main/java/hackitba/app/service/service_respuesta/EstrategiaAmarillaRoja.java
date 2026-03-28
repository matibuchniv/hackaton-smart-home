package hackitba.app.service.service_respuesta;

import org.springframework.stereotype.Component;

@Component
public class EstrategiaAmarillaRoja implements EstrategiaDeRespuesta {
    
    @Override
    public boolean aplica(Integer ultimaMedicion) {
        //HARDCODEADO HASTA IMPLEMENTAR
        // if (ultimaMedicion <= 800L) { return true;}    
        // else return false;
        return false;
    }

    @Override
    public void ejecutar(Integer ultimaMedicion) {
    }
}
