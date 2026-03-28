package hackitba.app.service.service_respuesta;

import java.util.List;

import org.springframework.stereotype.Service;

import hackitba.app.entitiy.MedicionCO2;
import hackitba.app.repository.RepoMediciones;

@Service
public class ServiceRespuesta {

    private boolean hayPersonas = true;
    private final List<EstrategiaDeRespuesta> estrategias;
    private final RepoMediciones repoMediciones;

    public ServiceRespuesta(List<EstrategiaDeRespuesta> estrategias,
                            RepoMediciones repoMediciones) {
        this.estrategias = estrategias;
        this.repoMediciones = repoMediciones;
    }

    public void setHayPersonas(boolean hayPersonas) {
        this.hayPersonas = hayPersonas;
    }

    public void evaluarRespuesta() {

        List<MedicionCO2> mediciones = repoMediciones.findAllOrderByFechaAsc();

        if (mediciones.isEmpty()) {
            throw new RuntimeException("❌ No hay mediciones en la base de datos");
        }

        MedicionCO2 medicion = mediciones.get(mediciones.size() - 1);

        if (medicion.getValor() == null) {
            throw new RuntimeException("❌ El valor de la medición es null");
        }

        System.out.println("📊 Valor medición: " + medicion.getValor());
        System.out.println("📊 Estrategias disponibles: " + estrategias.size());

        EstrategiaDeRespuesta estrategia = estrategias.stream()
                .filter(strategy -> strategy.aplica(medicion.getValor()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("❌ Ninguna estrategia aplica"));

        estrategia.ejecutar(medicion.getValor());
    }
}