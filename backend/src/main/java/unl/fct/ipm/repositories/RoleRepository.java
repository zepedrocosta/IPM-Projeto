package unl.fct.ipm.repositories;

import unl.fct.ipm.daos.Role;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
}
