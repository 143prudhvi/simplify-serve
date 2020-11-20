package com.simplify.myapp.service.impl;

import com.simplify.myapp.service.VillageService;
import com.simplify.myapp.domain.Village;
import com.simplify.myapp.repository.VillageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Village}.
 */
@Service
@Transactional
public class VillageServiceImpl implements VillageService {

    private final Logger log = LoggerFactory.getLogger(VillageServiceImpl.class);

    private final VillageRepository villageRepository;

    public VillageServiceImpl(VillageRepository villageRepository) {
        this.villageRepository = villageRepository;
    }

    @Override
    public Village save(Village village) {
        log.debug("Request to save Village : {}", village);
        return villageRepository.save(village);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Village> findAll() {
        log.debug("Request to get all Villages");
        return villageRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Village> findOne(Long id) {
        log.debug("Request to get Village : {}", id);
        return villageRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Village : {}", id);
        villageRepository.deleteById(id);
    }
}
