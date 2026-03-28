package hackitba.app.entitiy;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class MedicionCO2 {

    @Id
    @GeneratedValue
    private Long id;

    private Integer valor;
    private LocalDateTime fechaHoraMedicion;

     public MedicionCO2(Integer valor, LocalDateTime fechaHoraMedicion) {
        this.valor = valor;
        this.fechaHoraMedicion = fechaHoraMedicion;
    }

   
}
