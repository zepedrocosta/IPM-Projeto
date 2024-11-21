package unl.fct.ipm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import unl.fct.ipm.daos.Car;
import unl.fct.ipm.daos.CarServices;
import unl.fct.ipm.daos.enums.CarServiceTypeEnum;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CarServiceRepository extends JpaRepository<CarServices, UUID> {

    Optional<CarServices> findByCarAndId(Car car, UUID id);

    Optional<CarServices> findByCarAndType(Car car, CarServiceTypeEnum type);

    List<CarServices> findAllByCar(Car car);
}
