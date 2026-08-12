package com.task.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task.entity.Task;
import com.task.entity.User;

public interface TaskRepository extends JpaRepository<Task,Long>{

	//   tasks of login user
	List<Task> findByUser(User user);
	
	
	// task only if it belongs to the user
	Optional<Task> findByIdAndUser(Long id, User user);
}
