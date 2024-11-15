package unl.fct.ipm.validators.login;

import unl.fct.ipm.dtos.forms.users.LoginForm;
import unl.fct.ipm.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.server.ResponseStatusException;

@Component
@RequiredArgsConstructor
public class LoginValidator implements Validator {

    private final UserRepository users;

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz == LoginForm.class;
    }

    @Override
    public void validate(Object target, Errors errors) {
        var form = (LoginForm) target;

        if (errors.hasErrors())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        users.findByEmail(form.getEmail().trim().toLowerCase()).orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN));

    }
}
