package hackitba.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import hackitba.app.entitiy.MedicionCO2;

public interface RepoMediciones extends JpaRepository<MedicionCO2, Long>  {

    @Query("SELECT m FROM MedicionCO2 m ORDER BY m.fechaHoraMedicion ASC")
    List<MedicionCO2> findAllOrderByFechaAsc();
    
}
