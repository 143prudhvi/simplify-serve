package com.simplify.myapp.service;

import com.simplify.myapp.domain.Slip;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Slip}.
 */
public interface SlipService {

    /**
     * Save a slip.
     *
     * @param slip the entity to save.
     * @return the persisted entity.
     */
    Slip save(Slip slip);

    /**
     * Get all the slips.
     *
     * @return the list of entities.
     */
    List<Slip> findAll();


    /**
     * Get the "id" slip.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Slip> findOne(Long id);

    /**
     * Delete the "id" slip.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
