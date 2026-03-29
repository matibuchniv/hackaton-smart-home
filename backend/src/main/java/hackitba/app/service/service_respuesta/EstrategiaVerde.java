package hackitba.app.service.service_respuesta;

import org.springframework.stereotype.Component;

import hackitba.app.entitiy.UserHome;
@Component
public class EstrategiaVerde implements EstrategiaDeRespuesta {
    @Override
    public boolean aplica(Integer ultimaMedicion, UserHome userHome) {

        if (userHome.tieneFactorDeRiesgo()) 
            return (ultimaMedicion.compareTo(700) < 0);
        else 
            return (ultimaMedicion.compareTo(800) < 0);
    }

    @Override
    public void ejecutar(boolean hayPersonas) {
    }
}
