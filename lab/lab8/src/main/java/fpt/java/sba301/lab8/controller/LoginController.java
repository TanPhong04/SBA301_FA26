package fpt.java.sba301.lab8.controller;

import fpt.java.sba301.lab8.pojo.Student;
import fpt.java.sba301.lab8.service.IStudentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class LoginController {

    @Autowired
    private IStudentService iStudentService;

    @GetMapping("/login")
    public String showLogin() {
        return "loginForm";
    }

    @PostMapping("/loginForm")
    public String login(@RequestParam("txtEmail") String email,
                        @RequestParam("txtPassword") String password,
                        HttpSession session,
                        Model model) {

        // Tìm sinh viên trong MongoDB theo email
        Student student = iStudentService.findByEmail(email);

        // Kiểm tra mật khẩu (Sử dụng .equals vì password là String)
        if (student != null && student.getPassword().equals(password)) {
            session.setAttribute("email", email);
            return "redirect:/";
        }

        // Nếu sai thì hiển thị thông báo lỗi ngay trên trang login
        model.addAttribute("error", "Email hoặc mật khẩu không đúng!");
        return "loginForm";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate(); // Xóa toàn bộ session
        return "redirect:/login";
    }
}