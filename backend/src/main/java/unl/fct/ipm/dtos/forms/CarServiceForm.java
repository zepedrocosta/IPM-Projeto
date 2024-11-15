package unl.fct.ipm.dtos.forms;

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

    private LocalDateTime dueDate;

    private long dueKms;

    private CarServiceTypeEnum type;
}
