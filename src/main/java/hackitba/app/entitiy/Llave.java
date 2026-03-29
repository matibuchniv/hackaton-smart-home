package hackitba.app.entitiy;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@AllArgsConstructor
public class Llave {
    private boolean abierta;

    public void setAbierta(boolean b) {
        this.abierta = b;
    }
}
