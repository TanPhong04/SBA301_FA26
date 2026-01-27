package se.fu.vn.phongtt.slot15.repositories;


import se.fu.vn.phongtt.slot15.pojos.Product;
import java.util.List;

public interface IProductRepository {
    List<Product> getAllProducts();
    Product findById(int id);
    List<Product> search(String name);
    Product save(Product p);
    String delete(Integer id);
    Product update(Product product);
}