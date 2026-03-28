package hackitba.app.service;

import org.springframework.stereotype.Service;

import hackitba.app.entitiy.MedicionCO2;
import hackitba.app.repository.RepoMediciones;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ServiceMedicionesCO2 {

    private final RepoMediciones repoMediciones;

    public void cargarMedicion(MedicionCO2 medicion) {
        repoMediciones.save(medicion);
    }
    
}
