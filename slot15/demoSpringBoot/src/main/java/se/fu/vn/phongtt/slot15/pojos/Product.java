package se.fu.vn.phongtt.slot15.pojos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    private Integer id;
    private String name;
    private int quantity;
    private double price;
}
