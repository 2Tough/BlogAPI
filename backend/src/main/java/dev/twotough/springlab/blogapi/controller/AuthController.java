package dev.twotough.springlab.blogapi.controller;

import dev.twotough.springlab.blogapi.dto.AuthResponse;
import dev.twotough.springlab.blogapi.dto.LoginRequest;
import dev.twotough.springlab.blogapi.dto.RegisterRequest;
import dev.twotough.springlab.blogapi.model.User;
import dev.twotough.springlab.blogapi.repository.UserRepository;
import dev.twotough.springlab.blogapi.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework. web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    // Endpoint 1: Register
    @PostMapping("/register")
    public ResponseEntity<? > register(@RequestBody RegisterRequest request) {
        if(userRepository.existsByUsername(request.getUsername())){
            return ResponseEntity.badRequest().body("Usuario ya existe");
        }
            String encryptedPassword = passwordEncoder.encode(request.getPassword());
            User user = new User();
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(encryptedPassword);

            User savedUser = userRepository.save(user);

            String token = jwtService.generateToken(
                    savedUser.getId(),
                    savedUser.getUsername()
            );


        return ResponseEntity.ok(new AuthResponse(token, savedUser.getUsername()));
    }

    // Endpoint 2: Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(401).body("Credenciales incorrectes");
        }

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),  // ← Lo que envió el usuario (texto plano)
                user.getPassword()      // ← Lo que está en BD (encriptado)
        );

        if (!passwordMatches) {
            return ResponseEntity.status(401).body("Credenciales incorrectes");
        }
        String token = jwtService.generateToken(user.getId(), user.getUsername());

        return ResponseEntity.ok(new AuthResponse(token, user.getUsername()));
    }
}