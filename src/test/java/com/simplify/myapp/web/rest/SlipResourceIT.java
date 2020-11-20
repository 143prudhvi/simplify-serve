package com.simplify.myapp.web.rest;

import com.simplify.myapp.SimplifyServeApp;
import com.simplify.myapp.domain.Slip;
import com.simplify.myapp.repository.SlipRepository;
import com.simplify.myapp.service.SlipService;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SlipResource} REST controller.
 */
@SpringBootTest(classes = SimplifyServeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SlipResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_TBGR = 1L;
    private static final Long UPDATED_TBGR = 2L;

    private static final String DEFAULT_GRADE = "AAAAAAAAAA";
    private static final String UPDATED_GRADE = "BBBBBBBBBB";

    private static final Long DEFAULT_LOTNO = 1L;
    private static final Long UPDATED_LOTNO = 2L;

    private static final Double DEFAULT_WEIGHT = 1D;
    private static final Double UPDATED_WEIGHT = 2D;

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    @Autowired
    private SlipRepository slipRepository;

    @Autowired
    private SlipService slipService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSlipMockMvc;

    private Slip slip;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Slip createEntity(EntityManager em) {
        Slip slip = new Slip()
            .date(DEFAULT_DATE)
            .tbgr(DEFAULT_TBGR)
            .grade(DEFAULT_GRADE)
            .lotno(DEFAULT_LOTNO)
            .weight(DEFAULT_WEIGHT)
            .price(DEFAULT_PRICE);
        return slip;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Slip createUpdatedEntity(EntityManager em) {
        Slip slip = new Slip()
            .date(UPDATED_DATE)
            .tbgr(UPDATED_TBGR)
            .grade(UPDATED_GRADE)
            .lotno(UPDATED_LOTNO)
            .weight(UPDATED_WEIGHT)
            .price(UPDATED_PRICE);
        return slip;
    }

    @BeforeEach
    public void initTest() {
        slip = createEntity(em);
    }

    @Test
    @Transactional
    public void createSlip() throws Exception {
        int databaseSizeBeforeCreate = slipRepository.findAll().size();
        // Create the Slip
        restSlipMockMvc.perform(post("/api/slips")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(slip)))
            .andExpect(status().isCreated());

        // Validate the Slip in the database
        List<Slip> slipList = slipRepository.findAll();
        assertThat(slipList).hasSize(databaseSizeBeforeCreate + 1);
        Slip testSlip = slipList.get(slipList.size() - 1);
        assertThat(testSlip.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSlip.getTbgr()).isEqualTo(DEFAULT_TBGR);
        assertThat(testSlip.getGrade()).isEqualTo(DEFAULT_GRADE);
        assertThat(testSlip.getLotno()).isEqualTo(DEFAULT_LOTNO);
        assertThat(testSlip.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testSlip.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createSlipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = slipRepository.findAll().size();

        // Create the Slip with an existing ID
        slip.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSlipMockMvc.perform(post("/api/slips")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(slip)))
            .andExpect(status().isBadRequest());

        // Validate the Slip in the database
        List<Slip> slipList = slipRepository.findAll();
        assertThat(slipList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSlips() throws Exception {
        // Initialize the database
        slipRepository.saveAndFlush(slip);

        // Get all the slipList
        restSlipMockMvc.perform(get("/api/slips?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(slip.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].tbgr").value(hasItem(DEFAULT_TBGR.intValue())))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE)))
            .andExpect(jsonPath("$.[*].lotno").value(hasItem(DEFAULT_LOTNO.intValue())))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getSlip() throws Exception {
        // Initialize the database
        slipRepository.saveAndFlush(slip);

        // Get the slip
        restSlipMockMvc.perform(get("/api/slips/{id}", slip.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(slip.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.tbgr").value(DEFAULT_TBGR.intValue()))
            .andExpect(jsonPath("$.grade").value(DEFAULT_GRADE))
            .andExpect(jsonPath("$.lotno").value(DEFAULT_LOTNO.intValue()))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT.doubleValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingSlip() throws Exception {
        // Get the slip
        restSlipMockMvc.perform(get("/api/slips/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSlip() throws Exception {
        // Initialize the database
        slipService.save(slip);

        int databaseSizeBeforeUpdate = slipRepository.findAll().size();

        // Update the slip
        Slip updatedSlip = slipRepository.findById(slip.getId()).get();
        // Disconnect from session so that the updates on updatedSlip are not directly saved in db
        em.detach(updatedSlip);
        updatedSlip
            .date(UPDATED_DATE)
            .tbgr(UPDATED_TBGR)
            .grade(UPDATED_GRADE)
            .lotno(UPDATED_LOTNO)
            .weight(UPDATED_WEIGHT)
            .price(UPDATED_PRICE);

        restSlipMockMvc.perform(put("/api/slips")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSlip)))
            .andExpect(status().isOk());

        // Validate the Slip in the database
        List<Slip> slipList = slipRepository.findAll();
        assertThat(slipList).hasSize(databaseSizeBeforeUpdate);
        Slip testSlip = slipList.get(slipList.size() - 1);
        assertThat(testSlip.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testSlip.getTbgr()).isEqualTo(UPDATED_TBGR);
        assertThat(testSlip.getGrade()).isEqualTo(UPDATED_GRADE);
        assertThat(testSlip.getLotno()).isEqualTo(UPDATED_LOTNO);
        assertThat(testSlip.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testSlip.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingSlip() throws Exception {
        int databaseSizeBeforeUpdate = slipRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSlipMockMvc.perform(put("/api/slips")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(slip)))
            .andExpect(status().isBadRequest());

        // Validate the Slip in the database
        List<Slip> slipList = slipRepository.findAll();
        assertThat(slipList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSlip() throws Exception {
        // Initialize the database
        slipService.save(slip);

        int databaseSizeBeforeDelete = slipRepository.findAll().size();

        // Delete the slip
        restSlipMockMvc.perform(delete("/api/slips/{id}", slip.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Slip> slipList = slipRepository.findAll();
        assertThat(slipList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
