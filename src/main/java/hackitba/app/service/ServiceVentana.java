package hackitba.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hackitba.app.entitiy.Ventana;
import hackitba.app.entitiy.VentanaIoTAdapter;
import hackitba.app.repository.RepoVentana;
import jakarta.transaction.Transactional;

@Service
public class ServiceVentana {

    @Autowired
    private RepoVentana repoVentana;

    @Autowired
    private VentanaIoTAdapter ventanaIoT;

    @Transactional
    public Ventana guardar(Ventana ventana) {
        return repoVentana.save(ventana);
    }

    public List<Ventana> obtenerTodas() {
        return repoVentana.findAll();
    }

    @Transactional
    public void abrirVentanas() {
        List<Ventana> ventanas = repoVentana.findAll();

        for (Ventana v : ventanas) {
            v.abrir();
        }

    }

    @Transactional
    public void cerrarVentanas() {
        List<Ventana> ventanas = repoVentana.findAll();

        for (Ventana v : ventanas) {
            ventanaIoT.cerrar(v.getDeviceId());
            v.cerrar();
        }

    }

}
