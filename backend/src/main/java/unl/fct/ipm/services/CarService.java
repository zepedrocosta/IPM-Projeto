package unl.fct.ipm.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import unl.fct.ipm.daos.Car;
import unl.fct.ipm.daos.Document;
import unl.fct.ipm.daos.User;
import unl.fct.ipm.dtos.responses.DocumentResponse;
import unl.fct.ipm.repositories.CarRepository;
import unl.fct.ipm.repositories.DocumentRepository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository cars;

    private final DocumentRepository documents;

    @Transactional
    public Optional<Car> create(Car car) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        car.setOwner(principal);
        return Optional.of(cars.save(car));
    }

    public Car get(String licensePlate) {
        return cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Transactional
    public Optional<Void> delete(String licensePlate) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        cars.delete(car);
        return Optional.empty();
    }

    @Async
    public Future<List<Car>> list() {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return CompletableFuture.completedFuture(cars.findAllByOwner(principal));
    }

    @Transactional
    public Optional<DocumentResponse> createDocument(String licensePlate, Document document) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (documents.existsByCarAndFilename(car, document.getFilename()))
            throw new ResponseStatusException(HttpStatus.CONFLICT);

        document.setCar(car);
        documents.save(document);
        return Optional.of(new DocumentResponse(document.getFilename(), document.getType(), document.getDueDate(), licensePlate));
    }

    @Transactional
    public Optional<Void> deleteDocument(String licensePlate, String filename) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR));
        Document document = documents.findByCarAndFilename(car, filename).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        documents.delete(document);
        return Optional.empty();
    }

    public Optional<DocumentResponse> getDocument(String licensePlate, String filename) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR));
        Document document = documents.findByCarAndFilename(car, filename).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return Optional.of(new DocumentResponse(document.getFilename(), document.getType(), document.getDueDate(), licensePlate));
    }

    public List<DocumentResponse> listDocuments(String licensePlate) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR));
        return documents.findAllByCar(car).stream()
                .map(document -> new DocumentResponse(document.getFilename(), document.getType(), document.getDueDate(), licensePlate))
                .toList();
    }
}
