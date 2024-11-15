package unl.fct.ipm.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import unl.fct.ipm.daos.Car;
import unl.fct.ipm.dtos.forms.CarForm;
import unl.fct.ipm.dtos.responses.CarResponse;
import unl.fct.ipm.services.CarService;

import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<List<CarResponse>> list() {
        var cars = carService.list().get();
        List<CarResponse> carResponses = cars.stream()
                .map(car -> convert(car, CarResponse.class))
                .collect(Collectors.toList());
        return ok(carResponses);

    }

}
