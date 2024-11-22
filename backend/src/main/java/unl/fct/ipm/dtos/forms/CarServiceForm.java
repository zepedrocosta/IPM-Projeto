package unl.fct.ipm.dtos.forms;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import unl.fct.ipm.daos.enums.CarServiceTypeEnum;

import java.io.Serializable;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(doNotUseGetters = true)
@EqualsAndHashCode(doNotUseGetters = true)
public class CarServiceForm implements Serializable {

    @NotNull
    private LocalDateTime dueDate;

    @NotNull
    private long dueKms;

    @NotNull
    private CarServiceTypeEnum type;

    private String place;
}
