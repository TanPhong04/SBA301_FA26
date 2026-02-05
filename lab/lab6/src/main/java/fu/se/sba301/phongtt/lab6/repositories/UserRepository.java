package fu.se.sba301.phongtt.lab6.repositories;

import fu.se.sba301.phongtt.lab6.pojos.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
