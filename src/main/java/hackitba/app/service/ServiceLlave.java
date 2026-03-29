package hackitba.app.service;

import org.springframework.stereotype.Service;

import hackitba.app.entitiy.Llave;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceLlave {
    private Llave llave;

    public void abrirLlave() {
        llave.setAbierta(true);
    }

    public void cerrarLlave() {
        llave.setAbierta(false);
    }
}
