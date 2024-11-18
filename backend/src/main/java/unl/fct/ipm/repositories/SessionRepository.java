package unl.fct.ipm.repositories;

import unl.fct.ipm.daos.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import unl.fct.ipm.daos.User;

import java.util.Optional;
import java.util.UUID;

public interface SessionRepository extends JpaRepository<Session, UUID> {
    boolean existsByUserAndEndedIsNull(User user);
    Optional<Session> findByUserAndEndedIsNull(User user);
}
