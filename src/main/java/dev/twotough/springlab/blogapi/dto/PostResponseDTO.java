package dev.twotough.springlab.blogapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponseDTO {

    // Identificación del post
    private Long id;
    private String title;
    private String content;
    private String category;

    // Información del autor (solo datos públicos)
    private Long authorId;
    private String authorUsername;
    // private String authorEmail;  ← Comentado por privacidad

    // Fechas
    private LocalDateTime createdAt;  // ← Consistente con entidad
    private LocalDateTime updatedAt;

    // Contadores
    private Integer likesCount;
    private Integer commentsCount;
}
