package fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Entity
@Table(name = "Tag")
@Data
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tagID;

    // Sử dụng columnDefinition để ép kiểu NVARCHAR giúp lưu tên thẻ có dấu tiếng Việt
    @Column(columnDefinition = "NVARCHAR(100)")
    private String tagName;

    // Hỗ trợ ghi chú bằng tiếng Việt
    @Column(columnDefinition = "NVARCHAR(255)")
    private String note;

    @ManyToMany(mappedBy = "tags")
    private Set<NewsArticle> newsArticles;
}