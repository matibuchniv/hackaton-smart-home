package hackitba.app.service;

import org.springframework.stereotype.Service;

import hackitba.app.entitiy.UserHome;
import hackitba.app.repository.RepoUserHome;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceUserHome {

    private final RepoUserHome repoUserHome;

    public void cargarUserHome(UserHome userHome) {
        repoUserHome.save(userHome);
    }
}
