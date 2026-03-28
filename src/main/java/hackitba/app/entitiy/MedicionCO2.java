package hackitba.app.entitiy;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class MedicionCO2 {

    @Id
    @GeneratedValue
    private Long id;

    private Long valor;
    private LocalDateTime fechaHoraMedicion;

     public MedicionCO2(Long valor, LocalDateTime fechaHoraMedicion) {
        this.valor = valor;
        this.fechaHoraMedicion = fechaHoraMedicion;
    }

   
}
