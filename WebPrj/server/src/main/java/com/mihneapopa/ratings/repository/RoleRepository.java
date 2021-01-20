package com.mihneapopa.ratings.repository;

import com.mihneapopa.ratings.model.ERole;
import com.mihneapopa.ratings.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
