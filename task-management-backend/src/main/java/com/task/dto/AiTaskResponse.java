package com.task.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AiTaskResponse {

	private String description;

    private String priority;

    private int estimatedHours;
}
