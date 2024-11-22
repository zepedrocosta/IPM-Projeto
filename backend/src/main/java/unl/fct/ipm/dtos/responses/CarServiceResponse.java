package unl.fct.ipm.dtos.responses;

import lombok.*;
import unl.fct.ipm.daos.enums.CarServiceTypeEnum;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString(doNotUseGetters = true)
public class CarServiceResponse implements Serializable {

    private UUID id;

    private LocalDateTime dueDate;

    private long dueKms;

    private CarServiceTypeEnum type;

    private String place;

    private String plate;
}
