package unl.fct.ipm.dtos.responses;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import unl.fct.ipm.daos.enums.DocumentTypeEnum;

import java.io.Serializable;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString(doNotUseGetters = true)
public class DocumentResponse implements Serializable {

    private String filename;

    private DocumentTypeEnum type;

    private LocalDateTime dueDate;

    private String plate;
}
