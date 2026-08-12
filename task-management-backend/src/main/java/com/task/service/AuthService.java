package com.task.service;

import com.task.dto.LoginRequest;
import com.task.dto.LoginResponse;
import com.task.dto.RegisterRequest;

public interface AuthService {
	
	String register(RegisterRequest request);
	
	LoginResponse login(LoginRequest request);

}
