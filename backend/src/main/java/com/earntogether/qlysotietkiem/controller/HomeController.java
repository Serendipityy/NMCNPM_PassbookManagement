package com.earntogether.qlysotietkiem.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
// Will be considered to delete
@RestController
public class HomeController {
    @GetMapping("/")
    public ModelAndView helloWorld(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index.html");
        return modelAndView;
    }
}