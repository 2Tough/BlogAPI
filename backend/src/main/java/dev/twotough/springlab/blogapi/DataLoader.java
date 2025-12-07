package dev.twotough.springlab.blogapi;

import dev.twotough.springlab.blogapi.model.User;
import dev.twotough.springlab. blogapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Crear usuarios de prueba
        User user1 = new User();
        user1.setUsername("2Tough");
        user1.setEmail("2tough@example.com");
        userRepository.save(user1);

        User user2 = new User();
        user2. setUsername("testuser");
        user2.setEmail("test@example.com");
        userRepository.save(user2);

        System.out.println("✅ Datos de prueba cargados!");
    }
}