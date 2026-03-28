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
    private String deviceId;

    public Ventana() {}

    public Ventana(String descripcion) {
        this.descripcion = descripcion;
        this.abierta = false;
    }

    public String getDeviceId(){
        return this.deviceId;
    }

    public void abrir(){
        this.abierta = true;
    }

    public void cerrar(){
        this.abierta = false; 
    }

}