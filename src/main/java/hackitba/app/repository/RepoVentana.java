package hackitba.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hackitba.app.entitiy.Ventana;

@Repository
public interface RepoVentana extends JpaRepository<Ventana, Long> {

}
