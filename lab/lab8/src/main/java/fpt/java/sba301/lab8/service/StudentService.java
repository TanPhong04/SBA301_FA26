package fpt.java.sba301.lab8.service;

import fpt.java.sba301.lab8.pojo.Student;
import fpt.java.sba301.lab8.repository.IStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service // Đánh dấu đây là lớp Service
public class StudentService implements IStudentService {

    @Autowired
    private IStudentRepository iStudentRepo;

    @Override
    public List<Student> findAll() {
        return iStudentRepo.findAll(); // Gọi hàm lấy tất cả từ MongoDB
    }

    @Override
    public void save(Student student) {
        if (student.getId() <= 0) { // ID chưa có (hoặc = 0) -> tự tăng
            Student lastStudent = iStudentRepo.findTopByOrderByIdDesc();
            int nextId = (lastStudent != null) ? lastStudent.getId() + 1 : 1;
            student.setId(nextId);
        }
        iStudentRepo.save(student); // Lưu sinh viên vào database
    }

    @Override
    public void delete(Student student) {
        iStudentRepo.delete(student); // Xóa sinh viên khỏi database
    }

    @Override
    public Student findByEmail(String email) {
        return iStudentRepo.findByEmail(email); // Tìm sinh viên theo email
    }

    @Override
    public Student update(int studentID, Student updatedStudent) {
        Optional<Student> existingStudentOpt = iStudentRepo.findById(studentID);
        if (existingStudentOpt.isPresent()) {
            updatedStudent.setId(studentID);
            return iStudentRepo.save(updatedStudent);
        }
        return null;
    }
}
