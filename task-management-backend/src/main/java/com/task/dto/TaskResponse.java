package com.task.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.task.enums.Priority;
import com.task.enums.TaskStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TaskResponse {

	private Long id;

    private String title;

    private String description;

    private Priority priority;

    private LocalDate dueDate;

    private TaskStatus status;

    private LocalDateTime createdAt;
    
    private Integer estimatedHours;
}
