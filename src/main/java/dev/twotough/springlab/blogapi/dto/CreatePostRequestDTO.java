package dev.twotough.springlab.blogapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePostRequestDTO {

    private String title;
    private String content;
    private String category;
    private Long authorId;

}
