package com.task.service;

import java.util.List;

import com.task.dto.TaskRequest;
import com.task.dto.TaskResponse;
import com.task.enums.TaskStatus;

public interface TaskService {

	TaskResponse createTask(TaskRequest request, String email);

	List<TaskResponse> getMyTasks(String email);

	TaskResponse getTaskById(Long id, String email);

	TaskResponse updateTask(Long id, TaskRequest request, String email);

	TaskResponse updateStatus(Long id, TaskStatus status, String email);

	void deleteTask(Long id, String email);
}
