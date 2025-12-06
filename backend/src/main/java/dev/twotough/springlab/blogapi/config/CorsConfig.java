package dev.twotough.springlab.blogapi.config;

import org.springframework. context.annotation.Bean;
import org.springframework.context.annotation. Configuration;
import org.springframework. web.cors.CorsConfiguration;
import org.springframework.web. cors.UrlBasedCorsConfigurationSource;
import org. springframework.web.filter.CorsFilter;

import java.util. Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Permitir solicitudes desde React
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));

        // Métodos HTTP permitidos
        config. setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Headers permitidos
        config.setAllowedHeaders(Arrays.asList("*"));

        // Permitir credenciales
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}