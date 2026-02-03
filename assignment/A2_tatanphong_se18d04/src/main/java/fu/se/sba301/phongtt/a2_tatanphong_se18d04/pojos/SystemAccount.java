package fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "SystemAccount")
@Data
public class SystemAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountID;

    @Column(nullable = false, columnDefinition = "NVARCHAR(255)")
    private String accountName;

    @Column(nullable = false, unique = true)
    private String accountEmail;

    private Integer accountRole; // Admin = 1, Staff = 2

    @Column(nullable = false)
    private String accountPassword;

    @OneToMany(mappedBy = "createdBy")
    @JsonIgnore
    private List<NewsArticle> newsArticles;
}