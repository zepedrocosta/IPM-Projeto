package unl.fct.ipm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import unl.fct.ipm.daos.Role;
import unl.fct.ipm.repositories.RoleRepository;

import java.util.HashSet;

@SpringBootApplication
public class IpmProjApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(IpmProjApplication.class, args);
    }

    @Autowired
    RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {

        if (roleRepository.findAll().isEmpty()) {
            roleRepository.save(new Role("USER", "User role", new HashSet<>()));
            roleRepository.save(new Role("ADMIN", "Admin role", new HashSet<>()));
        }
    }
}
