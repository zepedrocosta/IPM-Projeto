package unl.fct.ipm.repositories;

import unl.fct.ipm.daos.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    Optional<User> findByEmail(String email);

    Optional<User> findByNickname(String nickname);

    Page<User> findByNicknameLike(String nickname, Pageable pageable);

    Page<User> findAll(Pageable pageable);
}
