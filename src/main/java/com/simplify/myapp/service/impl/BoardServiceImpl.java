package com.simplify.myapp.service.impl;

import com.simplify.myapp.service.BoardService;
import com.simplify.myapp.domain.Board;
import com.simplify.myapp.repository.BoardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Board}.
 */
@Service
@Transactional
public class BoardServiceImpl implements BoardService {

    private final Logger log = LoggerFactory.getLogger(BoardServiceImpl.class);

    private final BoardRepository boardRepository;

    public BoardServiceImpl(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Override
    public Board save(Board board) {
        log.debug("Request to save Board : {}", board);
        return boardRepository.save(board);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Board> findAll() {
        log.debug("Request to get all Boards");
        return boardRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Board> findOne(Long id) {
        log.debug("Request to get Board : {}", id);
        return boardRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Board : {}", id);
        boardRepository.deleteById(id);
    }
}
