package com.task.dto;

import java.time.LocalDate;
import com.task.enums.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
public class TaskRequest {

	 @NotBlank(message = "Title is required")
	    private String title;

	    private String description;

	    @NotNull(message = "Priority is required")
	    private Priority priority;

	    @NotNull(message = "Due date is required")
	    private LocalDate dueDate;

	    @NotNull(message = "Status is required")
	    private TaskStatus status;
	    
	    private Integer estimatedHours;
}
