package fu.se.sba301.phongtt.a2_tatanphong_se18d04.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Áp dụng cho tất cả API có tiền tố /api
                        .allowedOrigins("http://localhost:5173") // Cho phép địa chỉ của Frontend (Vite)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các phương thức được phép
                        .allowedHeaders("*") // Cho phép tất cả các Header
                        .allowCredentials(true); // Cho phép gửi kèm Cookie hoặc thông tin xác thực
            }
        };
    }
}