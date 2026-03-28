package hackitba.app.service.service_respuesta;

import org.springframework.stereotype.Component;

@Component
public interface EstrategiaDeRespuesta {
   
    public boolean aplica(Long ultimaMedicion);

    public void ejecutar();
}
