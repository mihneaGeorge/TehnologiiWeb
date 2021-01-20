package com.mihneapopa.ratings.repository;

import com.mihneapopa.ratings.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByName(String name);
}
