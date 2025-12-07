package dev.twotough.springlab.blogapi.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
