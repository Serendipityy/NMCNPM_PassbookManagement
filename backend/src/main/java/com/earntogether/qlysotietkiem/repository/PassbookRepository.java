package com.earntogether.qlysotietkiem.repository;

import com.earntogether.qlysotietkiem.entity.Passbook;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PassbookRepository extends MongoRepository<Passbook,
        String> {

    Optional<Passbook> findByPassbookCode(int passbookCode);
    Optional<Passbook> findByPassbookCodeAndStatus(int passbookCode, int status);

    List<Passbook> findByTermTypeAndDateCreated(int type,
                                                LocalDate dateCreated);
    Page<Passbook> findAllByStatus(Pageable pageable, int status);     
    void deleteAll();
}
