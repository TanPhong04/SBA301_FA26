package fu.se.sba301.phongtt.a2_tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.NewsArticle;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.repositories.NewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NewsArticleService {
    @Autowired
    private NewsArticleRepository newsArticleRepository;


    public List<NewsArticle> getActiveNews() {
        return newsArticleRepository.findByNewsStatus(1);
    }


    public List<NewsArticle> getMyNewsHistory(Integer staffId) {
        return newsArticleRepository.findByCreatedByAccountID(staffId);
    }


    public NewsArticle createOrUpdateNews(NewsArticle article) {
        return newsArticleRepository.save(article);
    }

    public void deleteNews(Integer id) {
        newsArticleRepository.deleteById(id);
    }

    public List<NewsArticle> searchNews(String keyword) {
        return newsArticleRepository.findByNewsTitleContainingOrHeadlineContaining(keyword, keyword);
    }
}