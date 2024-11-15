package unl.fct.ipm.daos;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(nullable = false)
    private LocalDateTime dueDate;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne
    private Car car;
}
