package com.mihneapopa.ratings.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roles")
public class Role {
    private String id;
    private ERole name;

    public Role() {
    }

    public Role(String id, ERole name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id='" + id + '\'' +
                ", name=" + name +
                '}';
    }
}
