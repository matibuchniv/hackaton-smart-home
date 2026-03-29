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

    public void sendYellowAlert() {
        String body = String.format(
            "ALERTA CO2\nNivel moderado detectado\nabriendo ventanas para mejorar ventilacion."
        );

        Message message = Message.creator(
            new PhoneNumber(toNumber),                  // destino
            new PhoneNumber(fromNumber),               // sandbox de twilio
            body
        ).create();

        System.out.println("Mensaje enviado: " + message.getSid());
    }

    public void sendOrangeAlert() {
        String body = String.format(
            "ALERTA CO2\nNivel alto detectado\nLa llave de paso fue cerrada y las ventanas abiertas, evite que personas habiten su hogar por tiempo prolongado."
        );

        Message message = Message.creator(
            new PhoneNumber(toNumber),                  // destino
            new PhoneNumber(fromNumber),               // sandbox de twilio
            body
        ).create();

        System.out.println("Mensaje enviado: " + message.getSid());
    }
    public void sendRedAlert() {
        String body = String.format(
            "ALERTA CO2\nNivel peligroso detectado\nEvacúe el área inmediatamente."
        );

        Message message = Message.creator(
            new PhoneNumber(toNumber),                  // destino
            new PhoneNumber(fromNumber),               // sandbox de twilio
            body
        ).create();

        System.out.println("Mensaje enviado: " + message.getSid());
    }



}