package se.fu.vn.phongtt.slot15.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.fu.vn.phongtt.slot15.pojos.Product;
import se.fu.vn.phongtt.slot15.repositories.ProductRepository;

import java.util.List;

@Service
public class ProductService implements IProductService {
    @Autowired
    private ProductRepository repository;

    @Override
    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    @Override
    public List<Product> getProducts() {
        return repository.getAllProducts();
    }

    @Override
    public Product getProductById(int id) {
        return repository.findById(id);
    }

    @Override
    public String deleteProduct(int id) {
        if (repository.findById(id) == null) {
            return "product not found !! " + id;
        }
        repository.delete(id);
        return "product removed !! " + id;
    }

    @Override
    public Product updateProduct(Product product) {
        return repository.update(product);
    }

    @Override
    public List<Product> search(String name) {
        return repository.search(name);
    }

}