package unl.fct.ipm.daos;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(doNotUseGetters = true, callSuper = true)
@EqualsAndHashCode(doNotUseGetters = true, callSuper = true)
@Entity(name = "cars")
public class Car extends DAO implements Serializable {

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private int year;

    @Column(nullable = false, unique = true)
    private String plate;

    @Column
    private String location;

    @Column(columnDefinition = "LONGTEXT")
    private String imageURL;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "car")
    private Set<Document> documents;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "car")
    private Set<CarServices> services;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne
    private User owner;
}
