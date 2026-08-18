package com.task.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.task.dto.AiTaskResponse;
import com.task.service.AiService;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class AiServiceImpl implements AiService {

	private final RestClient restClient;
	private final ObjectMapper objectMapper;

	@Value("${gemini.api.key}")
	private String apiKey;

	@Value("${gemini.api.url}")
	private String apiUrl;

	public AiServiceImpl(ObjectMapper objectMapper) {
		this.restClient = RestClient.create();
		this.objectMapper = objectMapper;
	}

	@Override
	public AiTaskResponse generateTask(String title) {

		//prompt using task title
		String prompt = """
				You are an AI task management assistant.

				Given this task title:
				"%s"

				Generate:
				1. A clear and useful task description.
				2. A priority: LOW, MEDIUM, or HIGH.
				3. Estimated completion time in hours.

				Return ONLY valid JSON.
				Do not use markdown.
				Do not use ```.

				Required format:
				{
				  "description": "task description",
				  "priority": "HIGH",
				  "estimatedHours": 4
				}
				""".formatted(title);

		try {

			Map<String, Object> requestBody = Map.of("contents",
					new Object[] { Map.of("parts", new Object[] { Map.of("text", prompt) }) });

			 
			//sending request to AI
			String response = restClient.post().uri(apiUrl).header("x-goog-api-key", apiKey)
					.contentType(MediaType.APPLICATION_JSON).body(requestBody).retrieve().body(String.class);

			System.out.println("Gemini response:");
			System.out.println(response);

			
			//reading AI response
			JsonNode root = objectMapper.readTree(response);

			JsonNode candidates = root.path("candidates");

			if (!candidates.isArray() || candidates.isEmpty()) {

				throw new RuntimeException("Gemini returned no candidates");
			}

			String generatedText = candidates.get(0).path("content").path("parts").get(0).path("text").asText();

			System.out.println("Generated text:");
			System.out.println(generatedText);

			generatedText = cleanJson(generatedText);

			//converting Ai response to DTO
			return objectMapper.readValue(generatedText, AiTaskResponse.class);

		} catch (Exception e) {

			System.err.println("Gemini AI error: " + e.getMessage());

			e.printStackTrace();

			//Using Deafult values if AI fails
			return new AiTaskResponse("AI could not generate a description. Please enter one manually.", "MEDIUM", 1);
		}

	}

	private String cleanJson(String text) {

		text = text.trim();

		if (text.startsWith("```json")) {
			text = text.substring(7);
		} else if (text.startsWith("```")) {
			text = text.substring(3);
		}

		if (text.endsWith("```")) {
			text = text.substring(0, text.length() - 3);
		}

		return text.trim();
	}
}
