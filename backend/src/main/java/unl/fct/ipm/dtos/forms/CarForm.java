package unl.fct.ipm.dtos.forms;

import jakarta.validation.constraints.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(doNotUseGetters = true)
@EqualsAndHashCode(doNotUseGetters = true)
public class CarForm implements Serializable {

    @NotBlank
    @Size(max = 64)
    private String brand;

    @NotBlank
    @Size(max = 128)
    private String model;

    @NotNull
    @Min(1885)
    @Max(2200)
    private int year;

    @NotBlank
    @Size(max = 8, min = 8)
    private String plate;
}
