package unl.fct.ipm.dtos.responses;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
@ToString(doNotUseGetters = true)
public class CarResponse implements Serializable {

    private String brand;

    private String model;

    private int year;

    private String plate;

    private String location;
}
