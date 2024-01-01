package com.earntogether.qlysotietkiem.service;

import com.earntogether.qlysotietkiem.dto.TermInsertDTO;
import com.earntogether.qlysotietkiem.dto.TermUpdateDTO;
import com.earntogether.qlysotietkiem.entity.Term;
import com.earntogether.qlysotietkiem.exception.DataNotValidException;
import com.earntogether.qlysotietkiem.exception.ResourceNotFoundException;
import com.earntogether.qlysotietkiem.repository.TermRepository;
import com.earntogether.qlysotietkiem.utils.converter.TermConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TermService {
    @Autowired
    private TermRepository termRepository;
    public List<Term> getAllTerm(){
        return termRepository.findAll();
    }

    public void insertTerm(TermInsertDTO termInsertDto) {
        var termName = termInsertDto.monthsOfTerm() == 0 ?
                 "Non-term" : termInsertDto.monthsOfTerm() + " months";
        if(termRepository.findByMonthsOfTerm(termInsertDto.monthsOfTerm()).isPresent()){
            throw new DataNotValidException("Already existed term " + termName);
        }
        int type = this.generateNewType();
        Term term = TermConverter.convertDTOtoEntity(termInsertDto, type);
        termRepository.save(term);
        System.out.println("-> Inserted " + term);
    }

    private int generateNewType() {
        int newType = 0;
        while(termRepository.findByType(newType).isPresent()){
            newType++;
        }
        return newType;
    }

    public void deleteTermByType(int type){
        termRepository.deleteByType(type).ifPresentOrElse(
                term -> System.out.println("-> Deleted term with type = " + type),
                () -> {throw new ResourceNotFoundException("Cannot delete " +
                        "because term with type = " + type + " does not exist.");}
        );

    }

    public Term getTermByType(int type) {
        return termRepository.findByType(type).orElseThrow(
                () -> new ResourceNotFoundException("Does not exist " +
                        "term with type = " + type));
    }

    public void updateTerm(TermUpdateDTO termUpdateDto) {
        int type = termUpdateDto.type();
        var term = termRepository.findByType(type).orElseThrow(
                () -> new ResourceNotFoundException("Not found " +
                        "term with type = " + type));
        // Update minimum deposit for term
        term.setMinDeposit(termUpdateDto.minDeposit());
        // Update minimum deposit time for term to take out
        term.setDaysWithdrawn(termUpdateDto.minDepositTime());
        term.setInterestRate(termUpdateDto.interestRate());
        termRepository.save(term);
        System.out.println("-> Updated " + term);
    }
}