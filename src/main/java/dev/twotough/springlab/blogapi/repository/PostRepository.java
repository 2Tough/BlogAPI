package dev.twotough.springlab.blogapi.repository;

import dev.twotough.springlab.blogapi.Post;
import dev.twotough.springlab.blogapi.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findByAuthor(User author);
    List<Post> findByCategory(String category);
    List<Post> findByTitleContainingIgnoreCase(String title);
    List<Post> findByCreatedAtAfter(LocalDateTime createdAt);

}
