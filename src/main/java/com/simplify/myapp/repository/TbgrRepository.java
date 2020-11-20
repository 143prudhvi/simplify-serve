package com.simplify.myapp.repository;

import com.simplify.myapp.domain.Tbgr;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Tbgr entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TbgrRepository extends JpaRepository<Tbgr, Long> {
}
