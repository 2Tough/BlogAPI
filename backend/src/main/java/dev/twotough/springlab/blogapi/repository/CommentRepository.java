package dev.twotough.springlab.blogapi.repository;

import dev.twotough.springlab.blogapi.model.Comment;
import dev.twotough.springlab.blogapi.model.Post;
import dev.twotough.springlab.blogapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
    List<Comment> findByAuthor(User author);
    List<Comment> findByAuthorAndPost(User author, Post post);
    List<Comment> findByCreatedAtAfter(LocalDateTime createdAt);
}
