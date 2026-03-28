package hackitba.app.service.service_respuesta;

import org.springframework.stereotype.Component;

@Component
public class EstrategiaVerdeAmarilla implements EstrategiaDeRespuesta {
    
    @Override
    public boolean aplica(Long ultimaMedicion) {
        if (ultimaMedicion <= 800L) { return true;}    
        else return false;
    }

    @Override
    public void ejecutar() {
    }
}
