package hackitba.app.entitiy;

import jakarta.persistence.*;

@Entity
@Table(name = "ventanas")
public class Ventana {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descripcion;
    private Boolean abierta;

    // Constructor vacío obligatorio
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

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean getAbierta() {
        return abierta;
    }

    public void setAbierta(Boolean abierta) {
        this.abierta = abierta;
    }
}