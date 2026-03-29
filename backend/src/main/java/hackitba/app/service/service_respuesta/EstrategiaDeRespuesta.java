package hackitba.app.service.service_respuesta;

import org.springframework.stereotype.Component;

import hackitba.app.entitiy.UserHome;

@Component
public interface EstrategiaDeRespuesta {
   
    public boolean aplica(Integer ultimaMedicion, UserHome userHome);

    public void ejecutar(boolean hayPersonas);
}
