package hackitba.app.repository;

import java.util.List;

import org.springframework.boot.security.autoconfigure.SecurityProperties.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import hackitba.app.entitiy.MedicionCO2;

public interface RepoMediciones extends JpaRepository<MedicionCO2, Long>  {

    @Query("SELECT u FROM User u ORDER BY u.fecha ASC")
    List<User> findAllOrderByFechaAsc();
    
}
