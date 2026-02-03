package fu.se.sba301.phongtt.a2_tatanphong_se18d04.controllers;

import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.Tag;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    @Autowired
    private TagService tagService;

    @GetMapping
    public List<Tag> getAll() {
        return tagService.getAllTags();
    }

    @PostMapping
    public Tag create(@RequestBody Tag tag) {
        return tagService.saveTag(tag);
    }

    @PutMapping("/{id}")
    public Tag update(@PathVariable Integer id, @RequestBody Tag tag) {
        tag.setTagID(id);
        return tagService.saveTag(tag);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        tagService.deleteTag(id);
    }
}