package com.mihneapopa.ratings.controller;

import com.mihneapopa.ratings.model.Project;
import com.mihneapopa.ratings.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ProjectController {
    @Autowired
    ProjectRepository projectRepository;

    SimpleDateFormat dateFormatConverter = new SimpleDateFormat("dd/MM/yyyy");

    @GetMapping("/projects")
    @PreAuthorize("hasRole('PM') or hasRole('TEACHER') or hasRole('ADMIN')")
    public List<Project> getAllProjects(@RequestParam(required = false) String name) {
        try {
            List<Project> projects = new ArrayList<>();

            if (name == null) {
                projects.addAll(projectRepository.findAll());
            } else {
                projects.addAll(projectRepository.findByName(name));
            }

            if (projects.isEmpty()) {
                return projects;
            }

            return projects;
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/projects/{id}")
    @PreAuthorize("hasRole('PM') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<Project> getProjectById(@PathVariable("id") String id) {
        Optional<Project> projectData = projectRepository.findById(id);

        return projectData.map(project -> new ResponseEntity<>(project, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/projects")
    @PreAuthorize("hasRole('PM') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        try {
            System.out.println(project);
            Project _project = projectRepository.save(new Project(project.getName(), project.getDescription(), project.getDeliveryDate(), project.getProjectLink()));

            return new ResponseEntity<>(_project, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/projects/{id}")
    @PreAuthorize("hasRole('PM') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<Project> updateProject(@PathVariable("id") String id, @RequestBody Project project) {
        Optional<Project> projectData = projectRepository.findById(id);

        if (projectData.isPresent()) {
            Project _project = projectData.get();
            _project.setName(project.getName());
            _project.setDeliveryDate(project.getDeliveryDate());
            _project.setDescription(project.getDescription());
            _project.setGrades(project.getGrades());
            _project.setMembers(project.getMembers());
            _project.setPartialDeliverables(project.getPartialDeliverables());
            _project.setProjectLink(project.getProjectLink());

            return new ResponseEntity<>(projectRepository.save(_project), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/projects/{id}")
    @PreAuthorize("hasRole('PM') or hasRole('TEACHER') or hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteProject(@PathVariable("id") String id) {
        try {
            projectRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/projects")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> deleteAllProjects(){
        try {
            projectRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
