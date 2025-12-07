package dev.twotough.springlab.blogapi.security;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {
    // 1. Una clave secreta para firmar tokens
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration}")
    private long EXPIRATION_TIME;

    // 2. Metodo para GENERAR un token
    public String generateToken(Long userId, String username) {
        String token = Jwts.builder()
                .setSubject(userId.toString())
                .claim("username", username)
                .setIssuedAt(new Date())              // Cuándo se creó
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))  // Cuándo expira (24h)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)  // Cómo firmarlo
                .compact();  // Generar el string

        return token;
    }

    // 3. Metodo para EXTRAER el userId de un token
    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        String userId = claims.getSubject();

        return Long.parseLong(userId);
    }

    // 4. Metodo para VALIDAR si un token es válido
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token);

            return true;
        } catch (Exception e) {
            return false;
        }

    }

}
