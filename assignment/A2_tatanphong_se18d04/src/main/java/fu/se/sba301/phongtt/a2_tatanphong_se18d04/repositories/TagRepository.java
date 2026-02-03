package fu.se.sba301.phongtt.a2_tatanphong_se18d04.repositories;

import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
}