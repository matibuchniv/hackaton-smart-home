package hackitba.app.service.service_respuesta;

import java.util.List;

import org.springframework.stereotype.Service;

import hackitba.app.entitiy.MedicionCO2;
import hackitba.app.repository.RepoMediciones;

@Service
public class ServiceRespuesta {

    private boolean hayPersonas = true;
    private List<EstrategiaDeRespuesta> estrategias;
    private RepoMediciones repoMediciones;

    public ServiceRespuesta(List<EstrategiaDeRespuesta> estrategias,RepoMediciones repoMediciones) {
        this.estrategias = estrategias;
        this.repoMediciones = repoMediciones;
    } 

    public void setHayPersonas(boolean hayPersonas) {
        this.hayPersonas = hayPersonas;
    } 

    public void evaluarRespuesta() {

        MedicionCO2 medicion = repoMediciones.findAllOrderByFechaAsc().getLast();
        EstrategiaDeRespuesta estrategia = estrategias.stream().filter( strategy -> strategy.aplica(medicion.getValor())).findFirst().orElseThrow(() -> new RuntimeException("no se cubrio ningun caso existente"));

    }




    
}
