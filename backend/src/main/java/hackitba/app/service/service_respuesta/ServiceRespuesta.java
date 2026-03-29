package hackitba.app.service.service_respuesta;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import hackitba.app.dto.VentanaDto;
import hackitba.app.entitiy.MedicionCO2;
import hackitba.app.entitiy.UserHome;
import hackitba.app.entitiy.Ventana;
import hackitba.app.repository.RepoMediciones;
import hackitba.app.repository.RepoUserHome;
import hackitba.app.service.ServiceLlave;
import hackitba.app.service.ServiceVentana;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceRespuesta {

    private boolean hayPersonas = true;
    private final List<EstrategiaDeRespuesta> estrategias;
    private final RepoMediciones repoMediciones;
    private final RepoUserHome repoUserHome;
    private final ServiceVentana serviceVentana;
    private final ServiceLlave serviceLlave;

    public void setHayPersonas(boolean hayPersonas) {
        this.hayPersonas = hayPersonas;
    }
    
    public boolean getHayPersonas() {
        return this.hayPersonas;
    }

    public void evaluarRespuesta() {

        List<MedicionCO2> mediciones = repoMediciones.findAllOrderByFechaAsc();
        UserHome userHome = repoUserHome.findAll().getFirst();

        if (mediciones.isEmpty()) {
            throw new RuntimeException(" No hay mediciones en la base de datos");
        }

        MedicionCO2 medicion = mediciones.getLast();

        if (medicion.getValor() == null) {
            throw new RuntimeException(" El valor de la medición es null");
        }


        EstrategiaDeRespuesta estrategia = estrategias.stream()
                .filter(strategy -> strategy.aplica(medicion.getValor(),userHome))
                .findFirst()
                .orElseThrow(() -> new RuntimeException(" Ninguna estrategia aplica"));

        estrategia.ejecutar(hayPersonas);
    }

    public List<String> listaDispositivos() {
        List<String> dispositivos = new ArrayList<>();
        dispositivos.add("camara 1");
        for (Ventana ventana : serviceVentana.obtenerTodas()) {
           dispositivos.add("ventana" + ventana.getId()); 
        }
        dispositivos.add("llave de paso 1");
    
        return dispositivos;
    }

    public Map<String,Object> generarDatosDashboard() {
        Map<String,Object> datos = new HashMap<>();

        datos.put("camara", true);
        datos.put("llave", serviceLlave.getLlave().isAbierta());

        List<MedicionCO2> mediciones = repoMediciones.findAllOrderByFechaAsc();

        if(mediciones.isEmpty()) {
        datos.put("sensor",0);
        } else {
        datos.put("sensor", mediciones.getLast().getValor().intValue());
        }

        List<VentanaDto> ventanaDtos = new ArrayList<>();
        for (Ventana ventana : serviceVentana.obtenerTodas()) {
           ventanaDtos.add(new VentanaDto(ventana.getNombre(),ventana.getAbierta())); 
        }
        datos.put("ventanas",ventanaDtos);

        return datos;
    }
}