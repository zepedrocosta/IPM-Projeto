package unl.fct.ipm.dtos.responses;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@ToString(doNotUseGetters = true)
public class ChatResponse implements Serializable {

    private UUID id;

    private String chatName;

    private String chatPic;
}
