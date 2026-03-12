package fpt.java.sba301.lab8.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import fpt.java.sba301.lab8.pojo.Student;
import fpt.java.sba301.lab8.repository.IStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private IStudentRepository iStudentRepository;

    @Override
    public void run(String... args) throws Exception {
        // Chỉ seed nếu collection đang trống
        if (iStudentRepository.count() == 0) {
            ObjectMapper mapper = new ObjectMapper();
            InputStream inputStream = new ClassPathResource("data/students.json").getInputStream();
            List<Student> students = mapper.readValue(inputStream, new TypeReference<List<Student>>() {});

            iStudentRepository.saveAll(students);
            System.out.println("✅ DataSeeder: Đã seed " + students.size() + " sinh viên từ students.json vào MongoDB.");
        } else {
            System.out.println("ℹ️ DataSeeder: Collection đã có dữ liệu, bỏ qua seed.");
        }
    }
}
