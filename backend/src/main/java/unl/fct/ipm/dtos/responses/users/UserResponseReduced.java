package unl.fct.ipm.dtos.responses.users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Setter
@Getter
@AllArgsConstructor
@ToString(doNotUseGetters = true)
public class UserResponseReduced implements Serializable {

    String nickname;

    String profilePic;
}
