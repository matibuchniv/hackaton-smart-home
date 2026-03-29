package hackitba.app.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hackitba.app.entitiy.Ventana;
import hackitba.app.service.ServiceVentana;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class VentantaController {
    
    private final ServiceVentana serviceVentana;

    @PostMapping("/abrirVentanas")
    public String abrirVentanas() {
        serviceVentana.abrirVentanas();
        return "ok";
    }

    @PostMapping("/cerrarVentanas")
    public String cerrarVentanas() {
        serviceVentana.cerrarVentanas();
        return "ok";
    }

    @PostMapping("/crearVentana")
    public Ventana crear(@RequestBody Ventana ventana) {
        return serviceVentana.guardar(ventana);
    }

    @GetMapping("listarVentanas")
    public List<Ventana> listar() {
        return serviceVentana.obtenerTodas();
    }

    
}
