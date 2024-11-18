package unl.fct.ipm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import unl.fct.ipm.daos.Car;
import unl.fct.ipm.daos.CarServices;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CarServiceRepository extends JpaRepository<CarServices, UUID> {

    Optional<CarServices> findByCarAndId(Car car, UUID id);

    List<CarServices> findAllByCar(Car car);
}
