package fpt.java.sba301.lab8.pojo;

import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "students")
public class Student {

    @Id
    private int id; // ID do người dùng cung cấp (không tự sinh)

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

    @NotBlank(message = "Password không được để trống")
    @Size(min = 6, message = "Password phải có ít nhất 6 ký tự")
    private String password;

    @NotBlank(message = "First name không được để trống")
    @Size(max = 50, message = "First name tối đa 50 ký tự")
    private String firstName;

    @NotBlank(message = "Last name không được để trống")
    @Size(max = 50, message = "Last name tối đa 50 ký tự")
    private String lastName;

    @Min(value = 0, message = "Marks phải >= 0")
    @Max(value = 10, message = "Marks phải <= 10")
    private int marks;

    private List<Book> books = new ArrayList<>();

    public Student() {}

    public Student(int id, String email, String password, String firstName, String lastName, int marks) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.marks = marks;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public int getMarks() { return marks; }
    public void setMarks(int marks) { this.marks = marks; }

    public List<Book> getBooks() { return books; }
    public void setBooks(List<Book> books) { this.books = books; }
}