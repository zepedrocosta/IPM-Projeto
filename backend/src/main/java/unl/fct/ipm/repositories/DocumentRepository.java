package unl.fct.ipm.repositories;

import unl.fct.ipm.daos.Car;
import unl.fct.ipm.daos.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DocumentRepository extends JpaRepository<Document, UUID> {

    Optional<Document> findByCarAndFilename(Car car, String filename);

    boolean existsByCarAndFilename(Car car, String filename);

    List<Document> findAllByCar(Car car);
}
