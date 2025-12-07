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
        System.out. println("🔍 Register attempt for user: " + request.getUsername());

        if(userRepository.existsByUsername(request.getUsername())){
            System.out.println("❌ Username already exists");
            return ResponseEntity.badRequest().body("Usuario ya existe");
        }

        String encryptedPassword = passwordEncoder.encode(request.getPassword());
        System.out.println("✅ Password encrypted: " + encryptedPassword);

        User user = new User();
        user.setUsername(request.getUsername());
        user. setEmail(request.getEmail());
        user.setPassword(encryptedPassword);

        User savedUser = userRepository.save(user);
        System.out. println("✅ User saved with ID: " + savedUser.getId());

        String token = jwtService. generateToken(
                savedUser.getId(),
                savedUser.getUsername()
        );
        System.out.println("✅ Token generated: " + token);

        return ResponseEntity.ok(new AuthResponse(token, savedUser.getUsername()));
    }

    // Endpoint 2: Login
    @PostMapping("/login")
    public ResponseEntity<? > login(@RequestBody LoginRequest request) {
        System.out. println("🔍 Login attempt for user: " + request.getUsername());

        User user = userRepository.findByUsername(request.getUsername())
                . orElse(null);

        if (user == null) {
            System.out.println("❌ User not found");
            return ResponseEntity.status(401). body("Credenciales incorrectos");
        }

        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatches) {
            System.out.println("❌ Password doesn't match");
            return ResponseEntity.status(401).body("Credenciales incorrectos");
        }

        String token = jwtService.generateToken(user.getId(), user.getUsername());
        System.out.println("✅ Login successful, token: " + token);

        return ResponseEntity.ok(new AuthResponse(token, user.getUsername()));
    }
}