package dev.twotough.springlab.blogapi.service;

import dev.twotough.springlab.blogapi.model.Post;
import dev.twotough.springlab.blogapi.model.User;
import dev.twotough.springlab.blogapi.dto.CreatePostRequestDTO;
import dev.twotough.springlab.blogapi.dto.PostResponseDTO;
import dev.twotough.springlab.blogapi.dto.UpdatePostRequestDTO;
import dev.twotough.springlab.blogapi.repository.PostRepository;
import dev.twotough.springlab.blogapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

        // 4. Convertir DTO usando helper
        return convertToDTO(savedPost);
    }

        // Listar posts

    public List<PostResponseDTO> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        List<PostResponseDTO> response = new ArrayList<>();

        for (Post post : posts) {
            response.add(convertToDTO(post));
        }

        return response;
    }

        // Metodo helper
    private PostResponseDTO convertToDTO(Post savedPost) {
        PostResponseDTO dto = new PostResponseDTO();

        dto.setId(savedPost.getId());
        dto.setTitle(savedPost.getTitle());
        dto.setContent(savedPost.getContent());
        dto.setCategory(savedPost.getCategory());
        dto.setAuthorId(savedPost.getAuthor().getId());
        dto.setAuthorUsername(savedPost.getAuthor().getUsername());
        dto.setCreatedAt(savedPost.getCreatedAt());
        dto.setUpdatedAt(savedPost.getUpdatedAt());
        dto.setLikesCount(savedPost.getLikesCount());
        dto.setCommentsCount(savedPost.getComments().size());

        // 5. Devolver DTO
        return dto;
    }

    public PostResponseDTO getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post no encontrado"));
        return convertToDTO(post);

    }

    public PostResponseDTO updatePost(Long id,  UpdatePostRequestDTO request) {
        // 1. Buscar post
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post no encontrado"));

        // 2. Actualizar post
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setCategory(request.getCategory());

        // 3. Devolver post actualizado
        Post updatedPost = postRepository.save(post);

        // 4. Convertir a DTO
        return convertToDTO(updatedPost);

    }

    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post no encontrado");
        }
        postRepository.deleteById(id);

    }

}
