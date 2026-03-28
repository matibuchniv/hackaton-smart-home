package hackitba.app.service.service_respuesta;

import org.springframework.stereotype.Component;

@Component
public interface EstrategiaDeRespuesta {
   
    public boolean aplica(Integer ultimaMedicion);

    public void ejecutar(Integer ultimaMedicion);
}
