package com.task.service.impl;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.task.dto.LoginRequest;
import com.task.dto.LoginResponse;
import com.task.dto.RegisterRequest;
import com.task.entity.User;
import com.task.repository.UserRepository;
import com.task.security.JwtUtil;
import com.task.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {

		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
	}

	@Override
	public String register(RegisterRequest request) {

		if (userRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already registered");
		}

		User user = new User();
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setCreatedAt(LocalDateTime.now());

		userRepository.save(user);

		return "Registration Successfull";
	}

	@Override
	public LoginResponse login(LoginRequest request) {

		// find user by a email
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("Invalid email or password"));

		// verify password
		boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());

		
		//checking password
		if (!passwordMatches) {
			throw new RuntimeException("Invalid email or password");
		}
		
		//generate JWT token
		String token = jwtUtil.generateToken(user.getEmail());
		
		return new LoginResponse(token);
	}

}
