package dev.twotough.springlab.blogapi.service;

import dev.twotough.springlab.blogapi.Post;
import dev.twotough.springlab.blogapi.User;
import dev.twotough.springlab.blogapi.dto.CreatePostRequestDTO;
import dev.twotough.springlab.blogapi.dto.PostResponseDTO;
import dev.twotough.springlab.blogapi.repository.PostRepository;
import dev.twotough.springlab.blogapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    public PostResponseDTO createPost(CreatePostRequestDTO request)  {
        // 1. Buscar el autor por ID
        User author = userRepository.findById(request.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Crear la entidad Post (mapear DTO → Entidad)
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setCategory(request.getCategory());
        post.setAuthor(author);  // ← Asignar el autor

        // 3. Guardar post
        Post savedPost = postRepository.save(post);

        // 4. Convertir entidad DTO
        PostResponseDTO response = new PostResponseDTO();
        response.setId(savedPost.getId());
        response.setTitle(savedPost.getTitle());
        response.setContent(savedPost.getContent());
        response.setCategory(savedPost.getCategory());
        response.setAuthorId(savedPost.getAuthor().getId());
        response.setCreatedAt(savedPost.getCreatedAt());
        response.setUpdatedAt(savedPost.getUpdatedAt());
        response.setLikesCount(savedPost.getLikesCount());
        response.setCommentsCount(savedPost.getComments().size());

        // 5. Devolver DTO
        return response;

    }
}
