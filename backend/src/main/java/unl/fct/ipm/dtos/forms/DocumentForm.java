package unl.fct.ipm.dtos.forms;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import unl.fct.ipm.daos.DocumentTypeEnum;

import java.io.Serializable;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(doNotUseGetters = true)
@EqualsAndHashCode(doNotUseGetters = true)
public class DocumentForm implements Serializable {

    @NotBlank
    @Size(max = 64)
    private String filename;

    @NotBlank
    @Size(max = 64)
    private DocumentTypeEnum type;

    @NotNull
    private LocalDateTime dueDate;
}
