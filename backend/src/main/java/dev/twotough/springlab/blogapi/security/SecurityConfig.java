package dev.twotough.springlab.blogapi.security;

import org.springframework.context.annotation. Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // Bean 1: Configurar qué rutas están protegidas
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Desactivar CSRF (para APIs REST)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**"). permitAll()   // ← Login/Register
                        .requestMatchers("/api/posts/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll() // Rutas públicas
                        .anyRequest().authenticated()              // Resto requiere auth
                )
                .headers(headers -> headers
                        .frameOptions(frame -> frame.disable())
                );

        return http.build();
    }

    // Bean 2: Encoder para encriptar passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}