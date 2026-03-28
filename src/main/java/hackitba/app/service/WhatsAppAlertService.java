package hackitba.app.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class WhatsAppAlertService {

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.whatsapp.from}")
    private String fromNumber;

    @Value("${twilio.whatsapp.to}")
    private String toNumber;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
    }

    public void sendAlert(Long co2Level) {
        String body = String.format(
            "ALERTA CO2\nNivel peligroso detectado: %d ppm\nEvacúe el área inmediatamente.",
            co2Level
        );

        Message message = Message.creator(
            new PhoneNumber(toNumber),                  // destino
            new PhoneNumber(fromNumber),               // sandbox de twilio
            body
        ).create();

        System.out.println("Mensaje enviado: " + message.getSid());
    }
}