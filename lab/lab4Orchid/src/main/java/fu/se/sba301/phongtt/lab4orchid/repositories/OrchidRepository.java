package fu.se.sba301.phongtt.lab4orchid.repositories;

import fu.se.sba301.phongtt.lab4orchid.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrchidRepository extends JpaRepository<Orchid, Integer> {
}
