package hackitba.app.entitiy;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ventanas")
@Data
public class Ventana {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descripcion;
    private Boolean abierta;

    public Ventana() {}

    public Ventana(String descripcion) {
        this.descripcion = descripcion;
        this.abierta = false;
    }

    public void abrir(){
        this.abierta = true;
    }

    public void cerrar(){
        this.abierta = false; 
    }

}