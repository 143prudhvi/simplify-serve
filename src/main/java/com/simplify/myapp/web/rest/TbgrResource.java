package com.simplify.myapp.web.rest;

import com.simplify.myapp.domain.Tbgr;
import com.simplify.myapp.service.TbgrService;
import com.simplify.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.simplify.myapp.domain.Tbgr}.
 */
@RestController
@RequestMapping("/api")
public class TbgrResource {

    private final Logger log = LoggerFactory.getLogger(TbgrResource.class);

    private static final String ENTITY_NAME = "tbgr";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TbgrService tbgrService;

    public TbgrResource(TbgrService tbgrService) {
        this.tbgrService = tbgrService;
    }

    /**
     * {@code POST  /tbgrs} : Create a new tbgr.
     *
     * @param tbgr the tbgr to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tbgr, or with status {@code 400 (Bad Request)} if the tbgr has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tbgrs")
    public ResponseEntity<Tbgr> createTbgr(@RequestBody Tbgr tbgr) throws URISyntaxException {
        log.debug("REST request to save Tbgr : {}", tbgr);
        if (tbgr.getId() != null) {
            throw new BadRequestAlertException("A new tbgr cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tbgr result = tbgrService.save(tbgr);
        return ResponseEntity.created(new URI("/api/tbgrs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tbgrs} : Updates an existing tbgr.
     *
     * @param tbgr the tbgr to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tbgr,
     * or with status {@code 400 (Bad Request)} if the tbgr is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tbgr couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tbgrs")
    public ResponseEntity<Tbgr> updateTbgr(@RequestBody Tbgr tbgr) throws URISyntaxException {
        log.debug("REST request to update Tbgr : {}", tbgr);
        if (tbgr.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tbgr result = tbgrService.save(tbgr);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tbgr.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tbgrs} : get all the tbgrs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tbgrs in body.
     */
    @GetMapping("/tbgrs")
    public List<Tbgr> getAllTbgrs() {
        log.debug("REST request to get all Tbgrs");
        return tbgrService.findAll();
    }

    /**
     * {@code GET  /tbgrs/:id} : get the "id" tbgr.
     *
     * @param id the id of the tbgr to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tbgr, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tbgrs/{id}")
    public ResponseEntity<Tbgr> getTbgr(@PathVariable Long id) {
        log.debug("REST request to get Tbgr : {}", id);
        Optional<Tbgr> tbgr = tbgrService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tbgr);
    }

    /**
     * {@code DELETE  /tbgrs/:id} : delete the "id" tbgr.
     *
     * @param id the id of the tbgr to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tbgrs/{id}")
    public ResponseEntity<Void> deleteTbgr(@PathVariable Long id) {
        log.debug("REST request to delete Tbgr : {}", id);
        tbgrService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
