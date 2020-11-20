package com.simplify.myapp.web.rest;

import com.simplify.myapp.SimplifyServeApp;
import com.simplify.myapp.domain.Board;
import com.simplify.myapp.repository.BoardRepository;
import com.simplify.myapp.service.BoardService;

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
 * Integration tests for the {@link BoardResource} REST controller.
 */
@SpringBootTest(classes = SimplifyServeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class BoardResourceIT {

    private static final String DEFAULT_BOARD = "AAAAAAAAAA";
    private static final String UPDATED_BOARD = "BBBBBBBBBB";

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private BoardService boardService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBoardMockMvc;

    private Board board;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Board createEntity(EntityManager em) {
        Board board = new Board()
            .board(DEFAULT_BOARD);
        return board;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Board createUpdatedEntity(EntityManager em) {
        Board board = new Board()
            .board(UPDATED_BOARD);
        return board;
    }

    @BeforeEach
    public void initTest() {
        board = createEntity(em);
    }

    @Test
    @Transactional
    public void createBoard() throws Exception {
        int databaseSizeBeforeCreate = boardRepository.findAll().size();
        // Create the Board
        restBoardMockMvc.perform(post("/api/boards")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(board)))
            .andExpect(status().isCreated());

        // Validate the Board in the database
        List<Board> boardList = boardRepository.findAll();
        assertThat(boardList).hasSize(databaseSizeBeforeCreate + 1);
        Board testBoard = boardList.get(boardList.size() - 1);
        assertThat(testBoard.getBoard()).isEqualTo(DEFAULT_BOARD);
    }

    @Test
    @Transactional
    public void createBoardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = boardRepository.findAll().size();

        // Create the Board with an existing ID
        board.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBoardMockMvc.perform(post("/api/boards")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(board)))
            .andExpect(status().isBadRequest());

        // Validate the Board in the database
        List<Board> boardList = boardRepository.findAll();
        assertThat(boardList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBoards() throws Exception {
        // Initialize the database
        boardRepository.saveAndFlush(board);

        // Get all the boardList
        restBoardMockMvc.perform(get("/api/boards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(board.getId().intValue())))
            .andExpect(jsonPath("$.[*].board").value(hasItem(DEFAULT_BOARD)));
    }
    
    @Test
    @Transactional
    public void getBoard() throws Exception {
        // Initialize the database
        boardRepository.saveAndFlush(board);

        // Get the board
        restBoardMockMvc.perform(get("/api/boards/{id}", board.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(board.getId().intValue()))
            .andExpect(jsonPath("$.board").value(DEFAULT_BOARD));
    }
    @Test
    @Transactional
    public void getNonExistingBoard() throws Exception {
        // Get the board
        restBoardMockMvc.perform(get("/api/boards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBoard() throws Exception {
        // Initialize the database
        boardService.save(board);

        int databaseSizeBeforeUpdate = boardRepository.findAll().size();

        // Update the board
        Board updatedBoard = boardRepository.findById(board.getId()).get();
        // Disconnect from session so that the updates on updatedBoard are not directly saved in db
        em.detach(updatedBoard);
        updatedBoard
            .board(UPDATED_BOARD);

        restBoardMockMvc.perform(put("/api/boards")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedBoard)))
            .andExpect(status().isOk());

        // Validate the Board in the database
        List<Board> boardList = boardRepository.findAll();
        assertThat(boardList).hasSize(databaseSizeBeforeUpdate);
        Board testBoard = boardList.get(boardList.size() - 1);
        assertThat(testBoard.getBoard()).isEqualTo(UPDATED_BOARD);
    }

    @Test
    @Transactional
    public void updateNonExistingBoard() throws Exception {
        int databaseSizeBeforeUpdate = boardRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBoardMockMvc.perform(put("/api/boards")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(board)))
            .andExpect(status().isBadRequest());

        // Validate the Board in the database
        List<Board> boardList = boardRepository.findAll();
        assertThat(boardList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBoard() throws Exception {
        // Initialize the database
        boardService.save(board);

        int databaseSizeBeforeDelete = boardRepository.findAll().size();

        // Delete the board
        restBoardMockMvc.perform(delete("/api/boards/{id}", board.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Board> boardList = boardRepository.findAll();
        assertThat(boardList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
