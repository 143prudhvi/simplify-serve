package com.simplify.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Slip.
 */
@Entity
@Table(name = "slip")
public class Slip implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "tbgr")
    private Long tbgr;

    @Column(name = "grade")
    private String grade;

    @Column(name = "lotno")
    private Long lotno;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "price")
    private Double price;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Slip date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Long getTbgr() {
        return tbgr;
    }

    public Slip tbgr(Long tbgr) {
        this.tbgr = tbgr;
        return this;
    }

    public void setTbgr(Long tbgr) {
        this.tbgr = tbgr;
    }

    public String getGrade() {
        return grade;
    }

    public Slip grade(String grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Long getLotno() {
        return lotno;
    }

    public Slip lotno(Long lotno) {
        this.lotno = lotno;
        return this;
    }

    public void setLotno(Long lotno) {
        this.lotno = lotno;
    }

    public Double getWeight() {
        return weight;
    }

    public Slip weight(Double weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getPrice() {
        return price;
    }

    public Slip price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Slip)) {
            return false;
        }
        return id != null && id.equals(((Slip) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Slip{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", tbgr=" + getTbgr() +
            ", grade='" + getGrade() + "'" +
            ", lotno=" + getLotno() +
            ", weight=" + getWeight() +
            ", price=" + getPrice() +
            "}";
    }
}
