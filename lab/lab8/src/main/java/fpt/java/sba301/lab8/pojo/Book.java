package fpt.java.sba301.lab8.pojo;

import org.springframework.data.annotation.Id;

// Book là embedded object bên trong Student, không phải top-level collection
public class Book {
    @Id
    private int id;
    private String title;
    private String author;
    private String isbn;

    public Book() {}

    public Book(int id, String title, String author, String isbn) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    // Getters và Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
}