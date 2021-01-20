package com.mihneapopa.ratings.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "projects")
public class Project {
    private String id;
    private String name;
    private String description;
    private List<Double> grades;
    private List<String> members;
    private List<PartialDeliverable> partialDeliverables;
    private Date deliveryDate;
    private String projectLink;

    public List<PartialDeliverable> getPartialDeliverables() {
        return partialDeliverables;
    }

    public void setPartialDeliverables(List<PartialDeliverable> partialDeliverables) {
        this.partialDeliverables = partialDeliverables;
    }

    public Project() {
    }

    public Project(String name, String description, Date deliveryDate, String projectLink) {
        this.name = name;
        this.description = description;
        this.deliveryDate = deliveryDate;
        this.projectLink = projectLink;
    }

    public String getProjectLink() {
        return projectLink;
    }

    public void setProjectLink(String projectLink) {
        this.projectLink = projectLink;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Double> getGrades() {
        return grades;
    }

    public void setGrades(List<Double> grades) {
        this.grades = grades;
    }

    public List<String> getMembers() {
        return members;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    @Override
    public String toString() {
        return "Project{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", grades=" + grades +
                ", members=" + members +
                ", partialDeliverables=" + partialDeliverables +
                ", deliveryDate=" + deliveryDate +
                ", projectLink='" + projectLink + '\'' +
                '}';
    }
}
