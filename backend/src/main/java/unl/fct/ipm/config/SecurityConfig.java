package unl.fct.ipm.config;

import unl.fct.ipm.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.servlet.HandlerExceptionResolver;

/**
 * Configuration class for security settings.
 * It is annotated with @EnableWebSecurity and @EnableMethodSecurity, to enable
 * Spring Security's web security support and method security respectively.
 * proxyTargetClass is set to true to ensure that the security aspects are
 * applied to the target class.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity(proxyTargetClass = true)
public class SecurityConfig {

    // Array of RequestMatcher objects representing paths that are allowed to be
    // accessed without authentication.
    public static final RequestMatcher[] ALLOWED = new RequestMatcher[] {
            new AntPathRequestMatcher("/rest/security", HttpMethod.PUT.name()), // Login
            new AntPathRequestMatcher("/rest/users", HttpMethod.POST.name()), // Register
            new AntPathRequestMatcher("/swagger-ui/**"), // Swagger UI
            new AntPathRequestMatcher("/swagger-ui.html"), // Swagger UI (Alt)
            new AntPathRequestMatcher("/v3/api-docs/**"), // OpenAPI
            new AntPathRequestMatcher("/v3/**"), // OpenAPI (Alt)
            request -> !request.getRequestURI().contains("rest")
    };

    @Lazy
    @Autowired
    private AuthService auth;

    @Lazy
    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    /**
     * Provides a SecurityFilterChain bean.
     * The chain is configured with various security settings such as CSRF
     * protection, session management, and authentication provider.
     * It also adds the FilterExceptionHandler and SessionFilter before the
     * LogoutFilter and UsernamePasswordAuthenticationFilter respectively.
     * 
     * @param https the HttpSecurity to configure
     * @return a SecurityFilterChain with the specified configuration
     * @throws Exception in case of errors
     */
    @Bean
    SecurityFilterChain chain(HttpSecurity https) throws Exception {
        https.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> request
                        // Allow access to the specified paths without authentication
                        .requestMatchers(ALLOWED)
                        .permitAll()
                        // Require authentication for all other paths
                        .anyRequest()
                        .authenticated())
                // Sets the session creation policy to STATELESS, meaning that SpringSecurity
                // will not create a HttpSession or use it to obtain the SecurityContext.
                // The session will be managed by the contents of the JWT token.
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(new FilterExceptionHandler(resolver), LogoutFilter.class) // Servlet Exceptions
                .addFilterBefore(new SessionFilter(auth), UsernamePasswordAuthenticationFilter.class);
        return https.build();
    }

    /**
     * Provides an AuthenticationProvider bean.
     * AuthenticationProvider is an interface that provides authentication logic.
     * The provider is a DaoAuthenticationProvider configured with the AuthService
     * and a password encoder.
     * 
     * @return an AuthenticationProvider with the specified configuration
     */
    @Bean
    AuthenticationProvider authenticationProvider() {
        var dap = new DaoAuthenticationProvider();
        dap.setUserDetailsService(auth);
        dap.setPasswordEncoder(passwordEncoder());
        return dap;
    }

    /**
     * Provides a PasswordEncoder bean.
     * The encoder is a BCryptPasswordEncoder.
     * 
     * @return a PasswordEncoder
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}