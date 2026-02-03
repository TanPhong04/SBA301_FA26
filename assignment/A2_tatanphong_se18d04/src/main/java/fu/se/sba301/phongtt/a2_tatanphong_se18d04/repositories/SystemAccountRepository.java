package fu.se.sba301.phongtt.a2_tatanphong_se18d04.repositories;


import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SystemAccountRepository extends JpaRepository<SystemAccount, Integer> {

    Optional<SystemAccount> findByAccountEmail(String email);

    List<SystemAccount> findByAccountNameContainingOrAccountEmailContaining(String name, String email);
}