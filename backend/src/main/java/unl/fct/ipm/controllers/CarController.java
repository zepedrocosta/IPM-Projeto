package unl.fct.ipm.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import unl.fct.ipm.daos.Car;
import unl.fct.ipm.daos.CarServices;
import unl.fct.ipm.daos.Document;
import unl.fct.ipm.dtos.forms.CarForm;
import unl.fct.ipm.dtos.forms.CarServiceForm;
import unl.fct.ipm.dtos.forms.DocumentForm;
import unl.fct.ipm.dtos.responses.CarResponse;
import unl.fct.ipm.dtos.responses.CarServiceResponse;
import unl.fct.ipm.dtos.responses.DocumentResponse;
import unl.fct.ipm.services.CarService;

import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "Cars")
@RestController
@RequiredArgsConstructor
@RequestMapping("/rest/cars")
public class CarController extends AbstractController {

    private final CarService carService;

    @Operation(summary = "Create a car")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Car created"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "409", description = "Car with same license plate already exists")
    })
    @PostMapping
    public ResponseEntity<CarResponse> create(@Validated @RequestBody CarForm form) {
        return ok(carService.create(convert(form, Car.class)), CarResponse.class);
    }

    @Operation(summary = "Get a car")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Car found"),
            @ApiResponse(responseCode = "404", description = "Car not found")
    })
    @GetMapping("/{plate}")
    public ResponseEntity<CarResponse> get(@PathVariable String plate) {
        return ok(carService.get(plate), CarResponse.class);
    }

    @Operation(summary = "Delete a car")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Car deleted"),
            @ApiResponse(responseCode = "404", description = "Car not found")
    })
    @DeleteMapping("/{plate}")
    public ResponseEntity<Void> delete(@PathVariable String plate) {
        return ok(carService.delete(plate));
    }

    @Operation(summary = "List all user's cars")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cars found (list may be empty)")
    })
    @GetMapping
    @SneakyThrows
    public ResponseEntity<List<CarResponse>> list(@RequestParam(defaultValue = "") String query) {
        var cars = carService.list(query).get();
        List<CarResponse> carResponses = cars.stream()
                .map(car -> convert(car, CarResponse.class))
                .collect(Collectors.toList());
        return ok(carResponses);

    }

    @Operation(summary = "Add a document to a car")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Document added"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "404", description = "Car not found"),
            @ApiResponse(responseCode = "409", description = "Document with same filename already exists")
    })
    @PostMapping("/{plate}/documents")
    public ResponseEntity<DocumentResponse> addDocument(@PathVariable String plate, @RequestBody DocumentForm document) {
        return ok(carService.createDocument(plate, convert(document, Document.class)));
    }

    @Operation(summary = "Remove a document from a car")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Document removed"),
            @ApiResponse(responseCode = "404", description = "Car or document not found")
    })
    @DeleteMapping("/{plate}/documents/{filename}")
    public ResponseEntity<Void> deleteDocument(@PathVariable String plate, @PathVariable String filename) {
        return ok(carService.deleteDocument(plate, filename));
    }

    @Operation(summary = "Get a single document")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Document found"),
            @ApiResponse(responseCode = "404", description = "Car or document not found")
    })
    @GetMapping("/{plate}/documents/{filename}")
    public ResponseEntity<String> getDocument(@PathVariable String plate, @PathVariable String filename) {
        return ok(carService.getDocument(plate, filename));
    }

    @Operation(summary = "List all documents of a car")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Documents found (list may be empty)"),
            @ApiResponse(responseCode = "404", description = "Car not found")
    })
    @GetMapping("/{plate}/documents")
    public ResponseEntity<List<DocumentResponse>> listDocuments(@PathVariable String plate) {
        return ok(carService.listDocuments(plate));
    }

    // TODO: OpenAPI documentation
    @PostMapping("/{plate}/services")
    public ResponseEntity<CarServiceResponse> addService(@PathVariable String plate, @RequestBody CarServiceForm service) {
        return ok(carService.createService(plate, convert(service, CarServices.class)));
    }

    @GetMapping("/{plate}/services/{id}")
    public ResponseEntity<CarServiceResponse> getService(@PathVariable String plate, @PathVariable String id) {
        return ok(carService.getService(plate, id));
    }

    @DeleteMapping("/{plate}/services/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable String plate, @PathVariable String id) {
        return ok(carService.deleteService(plate, id));
    }

    @GetMapping("/{plate}/services")
    public ResponseEntity<List<CarServiceResponse>> listServices(@PathVariable String plate) {
        return ok(carService.listServices(plate));
    }

}
