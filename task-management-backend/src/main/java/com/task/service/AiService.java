package com.task.service;

import com.task.dto.AiTaskResponse;

public interface AiService {

	 AiTaskResponse generateTask(String title);
}
