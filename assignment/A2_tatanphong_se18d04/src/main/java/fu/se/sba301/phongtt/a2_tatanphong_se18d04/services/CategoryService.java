package fu.se.sba301.phongtt.a2_tatanphong_se18d04.services;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.Category;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.repositories.CategoryRepository;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.repositories.NewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private NewsArticleRepository newsArticleRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public String deleteCategory(Integer id) {
        boolean hasNews = newsArticleRepository.existsByCategoryCategoryID(id);
        if (hasNews) {
            return "Không thể xóa: Danh mục này đang chứa bài viết!";
        }
        categoryRepository.deleteById(id);
        return "Xóa danh mục thành công.";
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }
}