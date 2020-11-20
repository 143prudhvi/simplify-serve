package com.simplify.myapp.repository;

import com.simplify.myapp.domain.Slip;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Slip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SlipRepository extends JpaRepository<Slip, Long> {
}
