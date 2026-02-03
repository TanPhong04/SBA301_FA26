package fu.se.sba301.phongtt.a2_tatanphong_se18d04.repositories;

import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Integer> {

    List<NewsArticle> findByNewsStatus(Integer status);

    List<NewsArticle> findByCreatedByAccountID(Integer accountID);

    List<NewsArticle> findByNewsTitleContainingOrHeadlineContaining(String title, String headline);

    boolean existsByCategoryCategoryID(Integer categoryID);

    boolean existsByCreatedByAccountID(Integer accountID);

    boolean existsByTagsTagID(Integer tagsTagID);
}