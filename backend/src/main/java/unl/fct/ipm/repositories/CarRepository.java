package unl.fct.ipm.repositories;

import org.springframework.data.jpa.repository.Query;
import unl.fct.ipm.daos.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import unl.fct.ipm.daos.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CarRepository extends JpaRepository<Car, UUID> {

    Optional<Car> findByPlate(String licensePlate);

    boolean existsByPlate(String licensePlate);

    List<Car> findAllByOwner(User owner);

    @Query("SELECT c FROM cars c WHERE c.owner = :owner AND (c.plate LIKE %:query% OR c.brand LIKE %:query% OR c.model LIKE %:query%)")
    List<Car> findAllByOwner(User owner, String query);
}
