package com.simplify.myapp.service;

import com.simplify.myapp.domain.Tbgr;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Tbgr}.
 */
public interface TbgrService {

    /**
     * Save a tbgr.
     *
     * @param tbgr the entity to save.
     * @return the persisted entity.
     */
    Tbgr save(Tbgr tbgr);

    /**
     * Get all the tbgrs.
     *
     * @return the list of entities.
     */
    List<Tbgr> findAll();


    /**
     * Get the "id" tbgr.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Tbgr> findOne(Long id);

    /**
     * Delete the "id" tbgr.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
