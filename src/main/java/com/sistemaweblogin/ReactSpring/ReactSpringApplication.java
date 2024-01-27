package com.sistemaweblogin.ReactSpring;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ReactSpringApplication {

	@Bean
	public ModelMapper mapper(){
		return new ModelMapper();
	}

	public static void main(String[] args) {
		System.setProperty("h2.server.webAllowOthers", "true");
		SpringApplication.run(ReactSpringApplication.class, args);
	}

}
