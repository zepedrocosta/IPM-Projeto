package unl.fct.ipm.services;

import lombok.SneakyThrows;
import unl.fct.ipm.daos.User;
import unl.fct.ipm.dtos.forms.users.EditUserForm;
import unl.fct.ipm.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

import static unl.fct.ipm.config.RedisConfig.USERS;


@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder encoder;

    private final UserRepository users;

    @Transactional
    public Optional<User> create(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        user.setEmail(user.getEmail().toLowerCase().trim());
        user.setNickname(user.getNickname().trim());
        var u = users.save(user);

        return Optional.of(u);
    }

    @Cacheable(value = USERS, key = "#nickname")
    @SneakyThrows
    public User get(String nickname) {
        return users.findByNickname(nickname).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Transactional
    @CacheEvict(value = USERS, key = "#form.nickname")
    public Optional<User> edit(EditUserForm form) {
        User u = users.findByNickname(form.getNickname())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        u.setName(form.getName());

        return Optional.of(users.save(u));
    }

    @Transactional
    @CacheEvict(value = USERS, key = "#nickname")
    public Optional<Void> delete(String nickname) {
        User u = users.findByNickname(nickname).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        users.delete(u);
        return Optional.empty();
    }

    @Async
    public Future<Page<User>> list(String query, Integer page, Integer size) {
        var pageable = PageRequest.of(page, size);
        Page<User> res;
        if (query != null && !query.isEmpty())
            res = users.findByNicknameLike(query, pageable);
        else
            res = users.findAll(pageable);
        return CompletableFuture.completedFuture(res);
    }

    //TODO: Implement this
    @Async
    public Future<List<String>> search(String query) {
        /*
        String end = query + "\uFFFF";
        var pageable = PageRequest.of(0, 10);
        var lu = users.findByNicknameLike2(query, end, pageable);
        return CompletableFuture.completedFuture(new ArrayList<>(lu.stream().limit(10).map(User::getNickname).toList()));
         */
        return CompletableFuture.completedFuture(new ArrayList<>());
    }

}
