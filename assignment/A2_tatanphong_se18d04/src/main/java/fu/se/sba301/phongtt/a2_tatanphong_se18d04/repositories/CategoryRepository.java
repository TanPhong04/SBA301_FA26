package fu.se.sba301.phongtt.a2_tatanphong_se18d04.repositories;


import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    List<Category> findByCategoryNameContaining(String name);


    List<Category> findByIsActive(Boolean isActive);
}
