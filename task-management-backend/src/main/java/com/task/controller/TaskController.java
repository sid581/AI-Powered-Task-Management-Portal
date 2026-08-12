package com.task.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.task.dto.TaskRequest;
import com.task.dto.TaskResponse;
import com.task.enums.TaskStatus;
import com.task.service.TaskService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

	private final TaskService taskService;

	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}

	
	//Create task for loged-in user
	@PostMapping
	public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest request,
			Authentication authentication) {

		String email = authentication.getName();

		TaskResponse task = taskService.createTask(request, email);

		return ResponseEntity.ok(task);
	}

	
	//Getting current user tasks
	@GetMapping
	public ResponseEntity<List<TaskResponse>> getMyTasks(Authentication authentication) {

		String email = authentication.getName();

		return ResponseEntity.ok(taskService.getMyTasks(email));
	}

	@GetMapping("/{id}")
	public ResponseEntity<TaskResponse> getTask(@PathVariable Long id, Authentication authentication) {

		String email = authentication.getName();

		return ResponseEntity.ok(taskService.getTaskById(id, email));
	}

	
	//Update  task
	@PutMapping("/{id}")
	public ResponseEntity<TaskResponse> updateTask(@PathVariable Long id, @Valid @RequestBody TaskRequest request,
			Authentication authentication) {

		String email = authentication.getName();

		return ResponseEntity.ok(taskService.updateTask(id, request, email));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteTask(@PathVariable Long id, Authentication authentication) {

		String email = authentication.getName();

		taskService.deleteTask(id, email);

		return ResponseEntity.ok("Task deleted successfully");
	}
	

	@PatchMapping("/{id}/status")
	public ResponseEntity<TaskResponse> updateStatus(@PathVariable Long id, @RequestParam TaskStatus status,
			Authentication authentication) {

		String email = authentication.getName();

		return ResponseEntity.ok(taskService.updateStatus(id, status, email));
	}

}
