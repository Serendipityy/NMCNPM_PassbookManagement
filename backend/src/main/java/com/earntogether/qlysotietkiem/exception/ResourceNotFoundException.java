package com.earntogether.qlysotietkiem.exception;
 
import org.springframework.http.HttpStatus;


public class ResourceNotFoundException extends CommonException{
    public ResourceNotFoundException(String message){
        super(HttpStatus.NOT_FOUND.value(), message);
    }
}
