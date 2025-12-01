package dev.twotough.springlab.blogapi.repository;

import dev.twotough.springlab.blogapi.Post;
import dev.twotough.springlab.blogapi.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Long> {




}
