package com.task.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiration}")
	private long expiration;

	// creating JWT fro login user
	public String generateToken(String email) {

		Date now = new Date();

		Date expiryDate = new Date(now.getTime() + expiration);

		return Jwts.builder().subject(email).issuedAt(now).expiration(expiryDate).signWith(getSigningKey()).compact();
	}

	// to get email from token
	public String extractEmail(String token) {

		return Jwts.parser().verifyWith((javax.crypto.SecretKey) getSigningKey()).build().parseSignedClaims(token)
				.getPayload().getSubject();
	}

	// to get signing key
	private Key getSigningKey() {

		return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
	}
}
