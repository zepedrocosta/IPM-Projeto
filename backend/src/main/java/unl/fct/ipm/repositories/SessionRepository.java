package unl.fct.ipm.repositories;

import unl.fct.ipm.daos.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SessionRepository extends JpaRepository<Session, UUID> {
    //boolean existsByUserAndEndedIsNull(String user);
    //Optional<Session> findByUserAndEndedIsNull(String user);
}
