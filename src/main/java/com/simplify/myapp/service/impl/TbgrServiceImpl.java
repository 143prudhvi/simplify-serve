package com.simplify.myapp.service.impl;

import com.simplify.myapp.service.TbgrService;
import com.simplify.myapp.domain.Tbgr;
import com.simplify.myapp.repository.TbgrRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Tbgr}.
 */
@Service
@Transactional
public class TbgrServiceImpl implements TbgrService {

    private final Logger log = LoggerFactory.getLogger(TbgrServiceImpl.class);

    private final TbgrRepository tbgrRepository;

    public TbgrServiceImpl(TbgrRepository tbgrRepository) {
        this.tbgrRepository = tbgrRepository;
    }

    @Override
    public Tbgr save(Tbgr tbgr) {
        log.debug("Request to save Tbgr : {}", tbgr);
        return tbgrRepository.save(tbgr);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Tbgr> findAll() {
        log.debug("Request to get all Tbgrs");
        return tbgrRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Tbgr> findOne(Long id) {
        log.debug("Request to get Tbgr : {}", id);
        return tbgrRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Tbgr : {}", id);
        tbgrRepository.deleteById(id);
    }
}
