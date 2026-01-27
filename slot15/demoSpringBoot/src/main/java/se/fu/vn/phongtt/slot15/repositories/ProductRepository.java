package se.fu.vn.phongtt.slot15.repositories;

import org.springframework.stereotype.Repository;
import se.fu.vn.phongtt.slot15.pojos.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ProductRepository implements IProductRepository {
    private List<se.fu.vn.phongtt.slot15.pojos.Product> list = List.of(
            new Product(1, "product 1", 10, 1000),
            new Product(2, "product 2", 20, 2000),
            new Product(3, "product 3", 30, 3000)
    );;

    @Override
    public List<Product> getAllProducts() {
        return list;
    }

    @Override
    public Product findById(int id) {
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getId() == id) {
                return list.get(i);
            }
        }
        return null;
    }

    @Override
    public List<Product> search(String name) {
        return list.stream()
                .filter(x -> x.getName().startsWith(name))
                .collect(Collectors.toList());
//        for (Product product : list) {
//            if (product.getName().startsWith(name)) {
//                return list;
//            }
//        }
//        return null;
    }

    @Override
    public Product save(Product p) {
        Product product = new Product();
        product.setId(p.getId());
        product.setName(p.getName());
        product.setQuantity(p.getQuantity());
        product.setPrice(p.getPrice());
        list.add(product);
        return product;
    }

    @Override
    public String delete(Integer id) {
        list.removeIf(x -> x.getId() == id);
        return null;
    }

    @Override
    public Product update(Product product) {
        int idx = 0;
        int id = 0;
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getId() == (product.getId())) {
                id = product.getId();
                idx = i;
                break;
            }
        }
        if (id == 0) {
            return null;
        }
        Product product1 = new Product();
        product1.setId(id);
        product1.setName(product.getName());
        product1.setQuantity(product.getQuantity());
        product1.setPrice(product.getPrice());
        list.set(idx, product);
        return product1;
    }
}