package com.simplify.myapp.service;

import com.simplify.myapp.domain.Grade;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Grade}.
 */
public interface GradeService {

    /**
     * Save a grade.
     *
     * @param grade the entity to save.
     * @return the persisted entity.
     */
    Grade save(Grade grade);

    /**
     * Get all the grades.
     *
     * @return the list of entities.
     */
    List<Grade> findAll();


    /**
     * Get the "id" grade.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Grade> findOne(Long id);

    /**
     * Delete the "id" grade.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
