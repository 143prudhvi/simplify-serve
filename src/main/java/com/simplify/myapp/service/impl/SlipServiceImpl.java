package com.simplify.myapp.service.impl;

import com.simplify.myapp.service.SlipService;
import com.simplify.myapp.domain.Slip;
import com.simplify.myapp.repository.SlipRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Slip}.
 */
@Service
@Transactional
public class SlipServiceImpl implements SlipService {

    private final Logger log = LoggerFactory.getLogger(SlipServiceImpl.class);

    private final SlipRepository slipRepository;

    public SlipServiceImpl(SlipRepository slipRepository) {
        this.slipRepository = slipRepository;
    }

    @Override
    public Slip save(Slip slip) {
        log.debug("Request to save Slip : {}", slip);
        return slipRepository.save(slip);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Slip> findAll() {
        log.debug("Request to get all Slips");
        return slipRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Slip> findOne(Long id) {
        log.debug("Request to get Slip : {}", id);
        return slipRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Slip : {}", id);
        slipRepository.deleteById(id);
    }
}
