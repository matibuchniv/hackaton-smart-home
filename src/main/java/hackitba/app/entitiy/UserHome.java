package hackitba.app.entitiy;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserHome {

    @Id
    @GeneratedValue
    private Long id;
    
    private String email;
    private String password; 
    private boolean tieneEnfermedad; 
    private boolean esMayorDeEdad;
    private boolean esMenorDeEdad;
    private String contactoDeEmergencia;

    public boolean tieneFactorDeRiesgo() {
        return (tieneEnfermedad || esMayorDeEdad || esMenorDeEdad);
    }

}
