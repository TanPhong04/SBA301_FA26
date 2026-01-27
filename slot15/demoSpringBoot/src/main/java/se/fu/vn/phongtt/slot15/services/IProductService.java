package se.fu.vn.phongtt.slot15.services;

import org.springframework.stereotype.Service;
import se.fu.vn.phongtt.slot15.pojos.Product;

import java.util.List;

public interface IProductService {
    Product saveProduct(Product product);
    List<Product> getProducts();
    Product getProductById(int id);
    String deleteProduct(int id);
    Product updateProduct(Product product);
    List<Product> search(String name);
}
