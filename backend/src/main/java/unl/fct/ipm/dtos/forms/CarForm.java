package unl.fct.ipm.dtos.forms;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;

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
    @Size(max = 4)
    private int year;

    @NotBlank
    @Size(max = 8)
    private String plate;
}
