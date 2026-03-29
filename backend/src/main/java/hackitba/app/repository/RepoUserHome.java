package hackitba.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import hackitba.app.entitiy.UserHome;

public interface RepoUserHome extends JpaRepository<UserHome,Long> {
    
}
