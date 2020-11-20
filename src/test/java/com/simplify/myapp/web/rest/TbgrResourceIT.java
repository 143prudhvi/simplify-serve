package com.simplify.myapp.web.rest;

import com.simplify.myapp.SimplifyServeApp;
import com.simplify.myapp.domain.Tbgr;
import com.simplify.myapp.repository.TbgrRepository;
import com.simplify.myapp.service.TbgrService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TbgrResource} REST controller.
 */
@SpringBootTest(classes = SimplifyServeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TbgrResourceIT {

    private static final String DEFAULT_BOARD = "AAAAAAAAAA";
    private static final String UPDATED_BOARD = "BBBBBBBBBB";

    private static final String DEFAULT_VILLAGE = "AAAAAAAAAA";
    private static final String UPDATED_VILLAGE = "BBBBBBBBBB";

    private static final Long DEFAULT_TBGR = 1L;
    private static final Long UPDATED_TBGR = 2L;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TbgrRepository tbgrRepository;

    @Autowired
    private TbgrService tbgrService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTbgrMockMvc;

    private Tbgr tbgr;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tbgr createEntity(EntityManager em) {
        Tbgr tbgr = new Tbgr()
            .board(DEFAULT_BOARD)
            .village(DEFAULT_VILLAGE)
            .tbgr(DEFAULT_TBGR)
            .name(DEFAULT_NAME);
        return tbgr;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tbgr createUpdatedEntity(EntityManager em) {
        Tbgr tbgr = new Tbgr()
            .board(UPDATED_BOARD)
            .village(UPDATED_VILLAGE)
            .tbgr(UPDATED_TBGR)
            .name(UPDATED_NAME);
        return tbgr;
    }

    @BeforeEach
    public void initTest() {
        tbgr = createEntity(em);
    }

    @Test
    @Transactional
    public void createTbgr() throws Exception {
        int databaseSizeBeforeCreate = tbgrRepository.findAll().size();
        // Create the Tbgr
        restTbgrMockMvc.perform(post("/api/tbgrs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tbgr)))
            .andExpect(status().isCreated());

        // Validate the Tbgr in the database
        List<Tbgr> tbgrList = tbgrRepository.findAll();
        assertThat(tbgrList).hasSize(databaseSizeBeforeCreate + 1);
        Tbgr testTbgr = tbgrList.get(tbgrList.size() - 1);
        assertThat(testTbgr.getBoard()).isEqualTo(DEFAULT_BOARD);
        assertThat(testTbgr.getVillage()).isEqualTo(DEFAULT_VILLAGE);
        assertThat(testTbgr.getTbgr()).isEqualTo(DEFAULT_TBGR);
        assertThat(testTbgr.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTbgrWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tbgrRepository.findAll().size();

        // Create the Tbgr with an existing ID
        tbgr.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTbgrMockMvc.perform(post("/api/tbgrs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tbgr)))
            .andExpect(status().isBadRequest());

        // Validate the Tbgr in the database
        List<Tbgr> tbgrList = tbgrRepository.findAll();
        assertThat(tbgrList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTbgrs() throws Exception {
        // Initialize the database
        tbgrRepository.saveAndFlush(tbgr);

        // Get all the tbgrList
        restTbgrMockMvc.perform(get("/api/tbgrs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tbgr.getId().intValue())))
            .andExpect(jsonPath("$.[*].board").value(hasItem(DEFAULT_BOARD)))
            .andExpect(jsonPath("$.[*].village").value(hasItem(DEFAULT_VILLAGE)))
            .andExpect(jsonPath("$.[*].tbgr").value(hasItem(DEFAULT_TBGR.intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getTbgr() throws Exception {
        // Initialize the database
        tbgrRepository.saveAndFlush(tbgr);

        // Get the tbgr
        restTbgrMockMvc.perform(get("/api/tbgrs/{id}", tbgr.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tbgr.getId().intValue()))
            .andExpect(jsonPath("$.board").value(DEFAULT_BOARD))
            .andExpect(jsonPath("$.village").value(DEFAULT_VILLAGE))
            .andExpect(jsonPath("$.tbgr").value(DEFAULT_TBGR.intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingTbgr() throws Exception {
        // Get the tbgr
        restTbgrMockMvc.perform(get("/api/tbgrs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTbgr() throws Exception {
        // Initialize the database
        tbgrService.save(tbgr);

        int databaseSizeBeforeUpdate = tbgrRepository.findAll().size();

        // Update the tbgr
        Tbgr updatedTbgr = tbgrRepository.findById(tbgr.getId()).get();
        // Disconnect from session so that the updates on updatedTbgr are not directly saved in db
        em.detach(updatedTbgr);
        updatedTbgr
            .board(UPDATED_BOARD)
            .village(UPDATED_VILLAGE)
            .tbgr(UPDATED_TBGR)
            .name(UPDATED_NAME);

        restTbgrMockMvc.perform(put("/api/tbgrs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTbgr)))
            .andExpect(status().isOk());

        // Validate the Tbgr in the database
        List<Tbgr> tbgrList = tbgrRepository.findAll();
        assertThat(tbgrList).hasSize(databaseSizeBeforeUpdate);
        Tbgr testTbgr = tbgrList.get(tbgrList.size() - 1);
        assertThat(testTbgr.getBoard()).isEqualTo(UPDATED_BOARD);
        assertThat(testTbgr.getVillage()).isEqualTo(UPDATED_VILLAGE);
        assertThat(testTbgr.getTbgr()).isEqualTo(UPDATED_TBGR);
        assertThat(testTbgr.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTbgr() throws Exception {
        int databaseSizeBeforeUpdate = tbgrRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTbgrMockMvc.perform(put("/api/tbgrs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tbgr)))
            .andExpect(status().isBadRequest());

        // Validate the Tbgr in the database
        List<Tbgr> tbgrList = tbgrRepository.findAll();
        assertThat(tbgrList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTbgr() throws Exception {
        // Initialize the database
        tbgrService.save(tbgr);

        int databaseSizeBeforeDelete = tbgrRepository.findAll().size();

        // Delete the tbgr
        restTbgrMockMvc.perform(delete("/api/tbgrs/{id}", tbgr.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tbgr> tbgrList = tbgrRepository.findAll();
        assertThat(tbgrList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
