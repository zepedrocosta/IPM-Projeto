package unl.fct.ipm.daos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.*;
import unl.fct.ipm.daos.enums.CarServiceTypeEnum;

import java.io.Serializable;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(doNotUseGetters = true, callSuper = true)
@EqualsAndHashCode(doNotUseGetters = true, callSuper = true)
@Entity(name = "services")
public class CarServices extends DAO implements Serializable {

    @Column(nullable = false)
    private LocalDateTime dueDate;

    @Column
    private long dueKms;

    @Column(nullable = false)
    private CarServiceTypeEnum type;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne
    private Car car;
}
