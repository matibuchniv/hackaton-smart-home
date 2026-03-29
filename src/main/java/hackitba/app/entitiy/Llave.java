package hackitba.app.entitiy;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class Llave {
    boolean abierta;

    public void setAbierta(boolean b) {
        this.abierta = b;
    }
}
