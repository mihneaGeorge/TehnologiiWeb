package com.mihneapopa.ratings.controller;

import com.mihneapopa.ratings.model.PartialDeliverable;
import com.mihneapopa.ratings.repository.PartialDeliverableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PartialDeliverableController {
    @Autowired
    PartialDeliverableRepository partialDeliverableRepository;

    @GetMapping("/partialDeliverables")
    @PreAuthorize("hasRole('PM') or hasRole('TEACHER') or hasRole('ADMIN')")
    public List<PartialDeliverable> getAllpartialDeliverables(@RequestParam(required = false) String name) {
        try {
            List<PartialDeliverable> partialDeliverables = new ArrayList<>();

            if (name == null) {
                partialDeliverables.addAll(partialDeliverableRepository.findAll());
            } else {
                partialDeliverables.addAll(partialDeliverableRepository.findByName(name));
            }

            if (partialDeliverables.isEmpty()) {
                return partialDeliverables;
            }

            return partialDeliverables;
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/partialDeliverables/{id}")
    @PreAuthorize("hasRole('PM') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<PartialDeliverable> getProjectById(@PathVariable("id") String id) {
        Optional<PartialDeliverable> projectData = partialDeliverableRepository.findById(id);

        return projectData.map(partialDeliverable -> new ResponseEntity<>(partialDeliverable, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/partialDeliverables")
    @PreAuthorize("hasRole('PM') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<PartialDeliverable> createProject(@RequestBody PartialDeliverable partialDeliverable) {
        try {
            System.out.println(partialDeliverable);
            PartialDeliverable _project = partialDeliverableRepository.save(new PartialDeliverable(partialDeliverable.getName(), partialDeliverable.getDescription(), partialDeliverable.getDeliveryDate()));

            return new ResponseEntity<>(_project, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/partialDeliverables/{id}")
    @PreAuthorize("hasRole('PM') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<PartialDeliverable> updatePartialDeliverable(@PathVariable("id") String id, @RequestBody PartialDeliverable partialDeliverable) {
        Optional<PartialDeliverable> projectData = partialDeliverableRepository.findById(id);

        if (projectData.isPresent()) {
            PartialDeliverable _partialDeliverable = projectData.get();
            _partialDeliverable.setName(partialDeliverable.getName());
            _partialDeliverable.setDeliveryDate(partialDeliverable.getDeliveryDate());
            _partialDeliverable.setDescription(partialDeliverable.getDescription());

            return new ResponseEntity<>(partialDeliverableRepository.save(_partialDeliverable), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/partialDeliverables/{id}")
    @PreAuthorize("hasRole('PM') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deletePartialDeliverable(@PathVariable("id") String id) {
        try {
            partialDeliverableRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/partialDeliverables")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteAllPartialDeliverables(){
        try {
            partialDeliverableRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
