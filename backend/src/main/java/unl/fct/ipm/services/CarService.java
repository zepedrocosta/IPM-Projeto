package unl.fct.ipm.services;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import unl.fct.ipm.daos.Car;
import unl.fct.ipm.daos.CarServices;
import unl.fct.ipm.daos.Document;
import unl.fct.ipm.daos.User;
import unl.fct.ipm.daos.enums.CarServiceTypeEnum;
import unl.fct.ipm.dtos.responses.CarServiceResponse;
import unl.fct.ipm.dtos.responses.DocumentResponse;
import unl.fct.ipm.repositories.CarRepository;
import unl.fct.ipm.repositories.CarServiceRepository;
import unl.fct.ipm.repositories.DocumentRepository;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

@Service
@RequiredArgsConstructor
public class CarService {

    public static final String CAR_NOT_FOUND = "Car not found";
    public static final String DOCUMENT_NOT_FOUND = "Document not found";
    public static final String SERVICE_NOT_FOUND = "Service not found";

    private final CarRepository cars;
    private final DocumentRepository documents;
    private final CarServiceRepository carServices;
    private final CarServiceRepository carServiceRepository;

    @Transactional
    @SneakyThrows
    public Optional<Car> create(Car car) {

        if (cars.existsByPlate(car.getPlate()))
            throw new ResponseStatusException(HttpStatus.CONFLICT);

        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        car.setYear(car.getYear());
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
    public Future<List<Car>> list(String query) {
        var principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (query.isEmpty())
            return CompletableFuture.completedFuture(cars.findAllByOwner(principal));
        else
            return CompletableFuture.completedFuture(cars.findAllByOwner(principal, query));
    }

    @Transactional
    public Optional<DocumentResponse> createDocument(String licensePlate, Document document) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, CAR_NOT_FOUND));
        var fn = document.getType() + " " + car.getPlate();

        var doc = documents.findByCarAndFilename(car, fn);

        doc.ifPresent(documents::delete);
        document.setFilename(fn);
        document.setCar(car);
        documents.save(document);
        return Optional.of(buildDocumentResponse(document, licensePlate));
    }

    @Transactional
    public Optional<Void> deleteDocument(String licensePlate, String filename) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, CAR_NOT_FOUND));
        Document document = documents.findByCarAndFilename(car, filename).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, DOCUMENT_NOT_FOUND));
        documents.delete(document);
        return Optional.empty();
    }

    public Optional<String> getDocument(String licensePlate, String filename) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, CAR_NOT_FOUND));
        Document document = documents.findByCarAndFilename(car, filename).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, DOCUMENT_NOT_FOUND));
        return Optional.of(document.getContent());
    }

    public List<DocumentResponse> listDocuments(String licensePlate) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, CAR_NOT_FOUND));
        return documents.findAllByCar(car).stream()
                .map(document -> buildDocumentResponse(document, licensePlate))
                .toList();
    }

    @Transactional
    public Optional<CarServiceResponse> createService(String licensePlate, CarServices service) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, CAR_NOT_FOUND));
        var s = carServiceRepository.findByCarAndType(car, service.getType());

        s.ifPresent(services -> car.getServices().remove(services));

        service.setCar(car);
        carServices.save(service);
        return Optional.of(buildCarServiceResponse(service, licensePlate));
    }

    public Optional<CarServiceResponse> getService(String licensePlate, String serviceId) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, CAR_NOT_FOUND));
        CarServices service = carServices.findByCarAndId(car, UUID.fromString(serviceId)).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, SERVICE_NOT_FOUND));
        return Optional.of(buildCarServiceResponse(service, licensePlate));
    }

    @Transactional
    public Optional<Void> deleteService(String licensePlate, String serviceId) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, CAR_NOT_FOUND));
        CarServices service = carServices.findByCarAndId(car, UUID.fromString(serviceId)).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, SERVICE_NOT_FOUND));
        carServices.delete(service);
        return Optional.empty();
    }

    public List<CarServiceResponse> listServices(String licensePlate) {
        Car car = cars.findByPlate(licensePlate).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, CAR_NOT_FOUND));
        return carServices.findAllByCar(car).stream()
                .map(service -> buildCarServiceResponse(service, licensePlate))
                .toList();
    }

    private DocumentResponse buildDocumentResponse(Document document, String licensePlate) {
        return new DocumentResponse(document.getFilename(), document.getType(), document.getDueDate(), licensePlate);
    }

    private CarServiceResponse buildCarServiceResponse(CarServices service, String licensePlate) {
        return new CarServiceResponse(service.getId(), service.getDueDate(), service.getDueKms(), service.getType(), service.getPlace(), licensePlate);
    }
}
