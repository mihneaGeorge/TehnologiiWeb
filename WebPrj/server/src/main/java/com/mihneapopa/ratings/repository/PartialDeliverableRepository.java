package com.mihneapopa.ratings.repository;

import com.mihneapopa.ratings.model.PartialDeliverable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PartialDeliverableRepository extends MongoRepository<PartialDeliverable, String> {
    List<PartialDeliverable> findByName(String name);
}
