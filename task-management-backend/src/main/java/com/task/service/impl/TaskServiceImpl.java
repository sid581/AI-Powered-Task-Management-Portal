package com.task.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.task.dto.TaskRequest;
import com.task.dto.TaskResponse;
import com.task.entity.Task;
import com.task.entity.User;
import com.task.enums.TaskStatus;
import com.task.exception.ResourceNotFoundException;
import com.task.repository.TaskRepository;
import com.task.repository.UserRepository;
import com.task.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

	private final TaskRepository taskRepository;
	private final UserRepository userRepository;

	public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository) {

		this.taskRepository = taskRepository;
		this.userRepository = userRepository;
	}

	@Override
	public TaskResponse createTask(TaskRequest request, String email) {

		//get loged in user
		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		Task task = new Task();

		task.setTitle(request.getTitle());
		task.setDescription(request.getDescription());
		task.setPriority(request.getPriority());
		task.setDueDate(request.getDueDate());
		task.setStatus(request.getStatus());
		task.setCreatedAt(LocalDateTime.now());
		task.setEstimatedHours(request.getEstimatedHours());

		task.setUser(user);

		Task savedTask = taskRepository.save(task);
		return convertToResponse(savedTask);
	}

	@Override
	public List<TaskResponse> getMyTasks(String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		return taskRepository.findByUser(user)
                .stream()
                .map(this::convertToResponse)
                .toList();
	}

	@Override
	public TaskResponse getTaskById(Long id, String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		Task task = taskRepository.findByIdAndUser(id, user)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found"));
		
		return convertToResponse(task);
	}

	@Override
	public TaskResponse updateTask(Long id, TaskRequest request, String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		
		// verify task belong to current user
		Task task = taskRepository.findByIdAndUser(id, user)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found"));

		task.setTitle(request.getTitle());
		task.setDescription(request.getDescription());
		task.setPriority(request.getPriority());
		task.setDueDate(request.getDueDate());
		task.setStatus(request.getStatus());

		Task updatedTask = taskRepository.save(task);
		
		return convertToResponse(updatedTask);
	}

	@Override
	public void deleteTask(Long id, String email) {

		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));

		Task task = taskRepository.findByIdAndUser(id, user)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found"));

		taskRepository.delete(task);
	}

	private TaskResponse convertToResponse(Task task) {

		return new TaskResponse(task.getId(), task.getTitle(), task.getDescription(), task.getPriority(),
				task.getDueDate(), task.getStatus(), task.getCreatedAt(),task.getEstimatedHours());
	}

	@Override
	public TaskResponse updateStatus(Long id, TaskStatus status, String email) {
		User user = userRepository
	            .findByEmail(email)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "User not found"));

	    Task task = taskRepository
	            .findByIdAndUser(id, user)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Task not found"));

	    task.setStatus(status);

	    Task updatedTask = taskRepository.save(task);

	    return convertToResponse(updatedTask);
	}

}
