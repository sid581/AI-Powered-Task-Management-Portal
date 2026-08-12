package com.task.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.task.dto.AiTaskResponse;
import com.task.service.AiService;

import jakarta.validation.constraints.NotBlank;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/ai")
public class AiController {

	 private final AiService aiService;

	    public AiController(AiService aiService) {
	        this.aiService = aiService;
	    }

	    
	    //generating task details using AI
	    @PostMapping("/generate-task")
	    public ResponseEntity<AiTaskResponse> generateTask(
	            @RequestParam
	            @NotBlank(message = "Task title is required")
	            String title) {

	        return ResponseEntity.ok(
	                aiService.generateTask(title)
	        );
	    }
}
