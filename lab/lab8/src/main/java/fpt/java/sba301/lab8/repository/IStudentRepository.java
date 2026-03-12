package fpt.java.sba301.lab8.repository;

import fpt.java.sba301.lab8.pojo.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStudentRepository extends MongoRepository<Student, Integer> {
    Student findByEmail(String email);
    Student findTopByOrderByIdDesc(); // Lấy sinh viên có ID lớn nhất
}