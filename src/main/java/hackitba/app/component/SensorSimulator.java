package hackitba.app.component;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import hackitba.app.entitiy.MedicionCO2;
import hackitba.app.service.ServiceMedicionesCO2;
import hackitba.app.service.ServiceUserHome;
import hackitba.app.service.service_respuesta.ServiceRespuesta;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SensorSimulator {

    private final ServiceMedicionesCO2 serviceMedicionesCO2;
    private final ServiceRespuesta serviceRespuesta;
    private final ServiceUserHome serviceUserHome;

    private final List<Integer> valores = List.of(400, 750, 1200, 1800, 2200, 3000);

    private int index = 0;

    @Scheduled(fixedRate = 5000) // cada 5 segundos
    public void enviarMedicion() {

        Integer valor = valores.get(index);

        MedicionCO2 medicion = new MedicionCO2(
                valor,
                LocalDateTime.now()
        );

        serviceMedicionesCO2.cargarMedicion(medicion);
        if (serviceUserHome.hayUserHome()) {
        serviceRespuesta.evaluarRespuesta();
        }

        index = (index + 1) % valores.size();
    }
}