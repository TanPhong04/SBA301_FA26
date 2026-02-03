package fu.se.sba301.phongtt.a2_tatanphong_se18d04.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}