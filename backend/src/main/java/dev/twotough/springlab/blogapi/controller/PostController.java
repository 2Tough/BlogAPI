package dev.twotough.springlab.blogapi.controller;

import dev.twotough.springlab.blogapi.dto.CreatePostRequestDTO;
import dev.twotough.springlab.blogapi.dto.PostResponseDTO;
import dev.twotough.springlab.blogapi.dto.UpdatePostRequestDTO;
import dev.twotough.springlab.blogapi.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<PostResponseDTO> createPost (
            @RequestBody CreatePostRequestDTO request)

    {
        PostResponseDTO response = postService.createPost(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    // GET - Listar todos los posts
    @GetMapping  // ← NUEVO
    public ResponseEntity<List<PostResponseDTO>> getAllPosts() {
        List<PostResponseDTO> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> getPostById(@PathVariable Long id) {
        PostResponseDTO post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostResponseDTO> updatePost(
            @PathVariable Long id, @RequestBody UpdatePostRequestDTO request) {
        PostResponseDTO updatedPost = postService.updatePost(id, request);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
