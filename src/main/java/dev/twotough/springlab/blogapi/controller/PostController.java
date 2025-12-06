package dev.twotough.springlab.blogapi.controller;

import dev.twotough.springlab.blogapi.Post;
import dev.twotough.springlab.blogapi.dto.CreatePostRequestDTO;
import dev.twotough.springlab.blogapi.dto.PostResponseDTO;
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
}
