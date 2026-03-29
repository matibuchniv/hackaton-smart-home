package hackitba.app.component;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import hackitba.app.entitiy.Ventana;
import hackitba.app.service.ServiceVentana;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
   
    private final ServiceVentana serviceVentana;

    @Override
    public void run(String... args) throws Exception {

        serviceVentana.guardar(new Ventana(true));
        serviceVentana.guardar(new Ventana(false));

    }

}
