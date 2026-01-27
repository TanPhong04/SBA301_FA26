package se.fu.vn.phongtt.slot15.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.fu.vn.phongtt.slot15.pojos.Product;
import se.fu.vn.phongtt.slot15.services.IProductService;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private IProductService service;

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return service.saveProduct(product);
    }

    @GetMapping
    public List<Product> findAllProducts() {
        return service.getProducts();
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String name) {
        return service.search(name);
    }

    @GetMapping("/{id}")
    public Product findProductById(@PathVariable int id) {
        return service.getProductById(id);
    }

    @PutMapping
    public Product updateProduct(@RequestBody Product product) {
        return service.updateProduct(product);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable int id) {
        return service.deleteProduct(id);
    }
}