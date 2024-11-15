package unl.fct.ipm.repositories;

import unl.fct.ipm.daos.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import unl.fct.ipm.daos.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CarRepository extends JpaRepository<Car, UUID> {

    Optional<Car> findByPlate(String licensePlate);

    List<Car> findAllByOwner(User owner);
}
