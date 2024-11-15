package unl.fct.ipm.dtos.responses.users;

import unl.fct.ipm.daos.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Setter
@Getter
@NoArgsConstructor
@ToString(doNotUseGetters = true)
public class UserResponsePrivilege extends UserResponse implements Serializable {

    private String email;

    private String phoneNum;

    private Role role;

    private String address;

    private String postalCode;

    private String nif;

    private int leafPoints;

    private boolean finishedRegister;
}
