package fpt.java.sba301.lab8.controller;

import fpt.java.sba301.lab8.pojo.Student;
import fpt.java.sba301.lab8.service.IStudentService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class HomeController {

    @Autowired
    private IStudentService iStudentService;

    @GetMapping("/")
    public String showHome(HttpSession session, Model model) {
        if (session.getAttribute("email") != null) {
            List<Student> list = iStudentService.findAll();
            model.addAttribute("studentList", list);
            if (!model.containsAttribute("student")) {
                model.addAttribute("student", new Student());
            }
            return "home";
        }
        return "redirect:/login";
    }

    @PostMapping("/manageStudent")
    public String manageStudent(@Valid @ModelAttribute("student") Student student,
                                BindingResult bindingResult,
                                @RequestParam("btnManageStudent") String type,
                                HttpSession session,
                                Model model) {

        // 1. Kiểm tra Session
        if (session.getAttribute("email") == null) {
            return "redirect:/login";
        }

        // 2. Delete không cần validate
        if ("delete".equals(type)) {
            iStudentService.delete(student);
            return "redirect:/";
        }

        // 3. Kiểm tra validation
        if (bindingResult.hasErrors()) {
            model.addAttribute("studentList", iStudentService.findAll());
            return "home";
        }

        // 3.1 Kiểm tra trùng email (Email là duy nhất)
        Student existingStudentWithEmail = iStudentService.findByEmail(student.getEmail());
        if (existingStudentWithEmail != null) {
            // Nếu là thao tác 'add', hoặc 'update' nhưng ID của account tìm thấy khác ID đang update (tức là trùng với email của người khác)
            if ("add".equals(type) || ("update".equals(type) && existingStudentWithEmail.getId() != student.getId())) {
                bindingResult.rejectValue("email", "error.student", "Email " + student.getEmail() + " đã tồn tại trong hệ thống");
                model.addAttribute("studentList", iStudentService.findAll());
                return "home";
            }
        }

        // 4. Xử lý add / update
        switch (type) {
            case "add":
                student.setId(0); // Set = 0 để service tự động sinh ID (max + 1)
                iStudentService.save(student);
                break;
            case "update":
                iStudentService.update(student.getId(), student);
                break;
        }

        return "redirect:/";
    }
}