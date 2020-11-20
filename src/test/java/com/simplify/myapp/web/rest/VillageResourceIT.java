package com.simplify.myapp.web.rest;

import com.simplify.myapp.SimplifyServeApp;
import com.simplify.myapp.domain.Village;
import com.simplify.myapp.repository.VillageRepository;
import com.simplify.myapp.service.VillageService;

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
 * Integration tests for the {@link VillageResource} REST controller.
 */
@SpringBootTest(classes = SimplifyServeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class VillageResourceIT {

    private static final String DEFAULT_BOARD = "AAAAAAAAAA";
    private static final String UPDATED_BOARD = "BBBBBBBBBB";

    private static final String DEFAULT_VILLAGE = "AAAAAAAAAA";
    private static final String UPDATED_VILLAGE = "BBBBBBBBBB";

    @Autowired
    private VillageRepository villageRepository;

    @Autowired
    private VillageService villageService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVillageMockMvc;

    private Village village;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Village createEntity(EntityManager em) {
        Village village = new Village()
            .board(DEFAULT_BOARD)
            .village(DEFAULT_VILLAGE);
        return village;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Village createUpdatedEntity(EntityManager em) {
        Village village = new Village()
            .board(UPDATED_BOARD)
            .village(UPDATED_VILLAGE);
        return village;
    }

    @BeforeEach
    public void initTest() {
        village = createEntity(em);
    }

    @Test
    @Transactional
    public void createVillage() throws Exception {
        int databaseSizeBeforeCreate = villageRepository.findAll().size();
        // Create the Village
        restVillageMockMvc.perform(post("/api/villages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(village)))
            .andExpect(status().isCreated());

        // Validate the Village in the database
        List<Village> villageList = villageRepository.findAll();
        assertThat(villageList).hasSize(databaseSizeBeforeCreate + 1);
        Village testVillage = villageList.get(villageList.size() - 1);
        assertThat(testVillage.getBoard()).isEqualTo(DEFAULT_BOARD);
        assertThat(testVillage.getVillage()).isEqualTo(DEFAULT_VILLAGE);
    }

    @Test
    @Transactional
    public void createVillageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = villageRepository.findAll().size();

        // Create the Village with an existing ID
        village.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVillageMockMvc.perform(post("/api/villages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(village)))
            .andExpect(status().isBadRequest());

        // Validate the Village in the database
        List<Village> villageList = villageRepository.findAll();
        assertThat(villageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVillages() throws Exception {
        // Initialize the database
        villageRepository.saveAndFlush(village);

        // Get all the villageList
        restVillageMockMvc.perform(get("/api/villages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(village.getId().intValue())))
            .andExpect(jsonPath("$.[*].board").value(hasItem(DEFAULT_BOARD)))
            .andExpect(jsonPath("$.[*].village").value(hasItem(DEFAULT_VILLAGE)));
    }
    
    @Test
    @Transactional
    public void getVillage() throws Exception {
        // Initialize the database
        villageRepository.saveAndFlush(village);

        // Get the village
        restVillageMockMvc.perform(get("/api/villages/{id}", village.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(village.getId().intValue()))
            .andExpect(jsonPath("$.board").value(DEFAULT_BOARD))
            .andExpect(jsonPath("$.village").value(DEFAULT_VILLAGE));
    }
    @Test
    @Transactional
    public void getNonExistingVillage() throws Exception {
        // Get the village
        restVillageMockMvc.perform(get("/api/villages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVillage() throws Exception {
        // Initialize the database
        villageService.save(village);

        int databaseSizeBeforeUpdate = villageRepository.findAll().size();

        // Update the village
        Village updatedVillage = villageRepository.findById(village.getId()).get();
        // Disconnect from session so that the updates on updatedVillage are not directly saved in db
        em.detach(updatedVillage);
        updatedVillage
            .board(UPDATED_BOARD)
            .village(UPDATED_VILLAGE);

        restVillageMockMvc.perform(put("/api/villages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVillage)))
            .andExpect(status().isOk());

        // Validate the Village in the database
        List<Village> villageList = villageRepository.findAll();
        assertThat(villageList).hasSize(databaseSizeBeforeUpdate);
        Village testVillage = villageList.get(villageList.size() - 1);
        assertThat(testVillage.getBoard()).isEqualTo(UPDATED_BOARD);
        assertThat(testVillage.getVillage()).isEqualTo(UPDATED_VILLAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingVillage() throws Exception {
        int databaseSizeBeforeUpdate = villageRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVillageMockMvc.perform(put("/api/villages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(village)))
            .andExpect(status().isBadRequest());

        // Validate the Village in the database
        List<Village> villageList = villageRepository.findAll();
        assertThat(villageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVillage() throws Exception {
        // Initialize the database
        villageService.save(village);

        int databaseSizeBeforeDelete = villageRepository.findAll().size();

        // Delete the village
        restVillageMockMvc.perform(delete("/api/villages/{id}", village.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Village> villageList = villageRepository.findAll();
        assertThat(villageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
