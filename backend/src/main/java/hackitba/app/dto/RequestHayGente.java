package hackitba.app.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data@NoArgsConstructor
public class RequestHayGente {
    boolean person;

    public boolean getPerson(){
        return this.person;
    }
}
