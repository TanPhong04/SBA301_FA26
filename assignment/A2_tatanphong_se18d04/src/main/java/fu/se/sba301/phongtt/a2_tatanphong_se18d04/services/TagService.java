package fu.se.sba301.phongtt.a2_tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.Tag;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.repositories.NewsArticleRepository;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private NewsArticleRepository newsArticleRepository;

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Tag saveTag(Tag tag) {
        return tagRepository.save(tag);
    }


    public String deleteTag(Integer id) {
        // 1. Kiểm tra xem Tag có tồn tại trong bài viết nào không
        boolean isUsed = newsArticleRepository.existsByTagsTagID(id);

        if (isUsed) {
            return "Không thể xóa: Tag này đang được gắn vào một hoặc nhiều bài viết!";
        }

        // 2. Nếu không có ràng buộc, tiến hành xóa [cite: 10]
        tagRepository.deleteById(id);
        return "Xóa Tag thành công.";
}}