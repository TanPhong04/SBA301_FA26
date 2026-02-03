package fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "Category")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryID;

    @Column(nullable = false, columnDefinition = "NVARCHAR(255)")
    private String categoryName;

    @Column(columnDefinition = "NVARCHAR(500)")
    private String categoryDesciption;

    @ManyToOne
    @JoinColumn(name = "ParentCategoryID")
    private Category parentCategory;

    private Boolean isActive;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<NewsArticle> newsArticles;
}