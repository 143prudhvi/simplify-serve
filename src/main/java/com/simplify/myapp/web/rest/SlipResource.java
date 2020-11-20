package com.simplify.myapp.web.rest;

import com.simplify.myapp.domain.Slip;
import com.simplify.myapp.service.SlipService;
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
 * REST controller for managing {@link com.simplify.myapp.domain.Slip}.
 */
@RestController
@RequestMapping("/api")
public class SlipResource {

    private final Logger log = LoggerFactory.getLogger(SlipResource.class);

    private static final String ENTITY_NAME = "slip";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SlipService slipService;

    public SlipResource(SlipService slipService) {
        this.slipService = slipService;
    }

    /**
     * {@code POST  /slips} : Create a new slip.
     *
     * @param slip the slip to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new slip, or with status {@code 400 (Bad Request)} if the slip has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/slips")
    public ResponseEntity<Slip> createSlip(@RequestBody Slip slip) throws URISyntaxException {
        log.debug("REST request to save Slip : {}", slip);
        if (slip.getId() != null) {
            throw new BadRequestAlertException("A new slip cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Slip result = slipService.save(slip);
        return ResponseEntity.created(new URI("/api/slips/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /slips} : Updates an existing slip.
     *
     * @param slip the slip to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated slip,
     * or with status {@code 400 (Bad Request)} if the slip is not valid,
     * or with status {@code 500 (Internal Server Error)} if the slip couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/slips")
    public ResponseEntity<Slip> updateSlip(@RequestBody Slip slip) throws URISyntaxException {
        log.debug("REST request to update Slip : {}", slip);
        if (slip.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Slip result = slipService.save(slip);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, slip.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /slips} : get all the slips.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of slips in body.
     */
    @GetMapping("/slips")
    public List<Slip> getAllSlips() {
        log.debug("REST request to get all Slips");
        return slipService.findAll();
    }

    /**
     * {@code GET  /slips/:id} : get the "id" slip.
     *
     * @param id the id of the slip to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the slip, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/slips/{id}")
    public ResponseEntity<Slip> getSlip(@PathVariable Long id) {
        log.debug("REST request to get Slip : {}", id);
        Optional<Slip> slip = slipService.findOne(id);
        return ResponseUtil.wrapOrNotFound(slip);
    }

    /**
     * {@code DELETE  /slips/:id} : delete the "id" slip.
     *
     * @param id the id of the slip to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/slips/{id}")
    public ResponseEntity<Void> deleteSlip(@PathVariable Long id) {
        log.debug("REST request to delete Slip : {}", id);
        slipService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
