package hackitba.app.service;

import org.springframework.stereotype.Service;

import hackitba.app.entitiy.Llave;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Getter
public class ServiceLlave {
    private Llave llave = new Llave(true);

    public void abrirLlave() {
        llave.setAbierta(true);
    }

    public void cerrarLlave() {
        llave.setAbierta(false);
    }
}
