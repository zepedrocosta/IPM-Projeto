package unl.fct.ipm.daos;

import jakarta.persistence.*;
import lombok.*;
import unl.fct.ipm.daos.enums.DocumentTypeEnum;

import java.io.Serializable;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(doNotUseGetters = true, callSuper = true)
@EqualsAndHashCode(doNotUseGetters = true, callSuper = true)
@Entity(name = "documents")
public class Document extends DAO implements Serializable {

    @Column(nullable = false, unique = true)
    private String filename;

    @Enumerated
    private DocumentTypeEnum type;

    @Column
    private LocalDateTime dueDate;

    @Lob
    private byte[] content;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne
    private Car car;
}
