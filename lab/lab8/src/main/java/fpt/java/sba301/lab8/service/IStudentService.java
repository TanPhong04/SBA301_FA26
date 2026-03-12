package fpt.java.sba301.lab8.service;

import fpt.java.sba301.lab8.pojo.Student;

import java.util.List;

public interface IStudentService {
    List<Student> findAll();                       // Lấy danh sách sinh viên
    void save(Student student);                   // Thêm sinh viên mới
    void delete(Student student);                 // Xóa sinh viên
    Student findByEmail(String email);            // Tìm theo email (cho Login)
    Student update(int studentID, Student updatedStudent); // Cập nhật thông tin
}
