package com.xoriant.app.repository;

import com.xoriant.app.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer>{

	User getByUserId(int userId);

	@Query("update User c set c.password = :password where c.userId = :userId")
	void changePassword(int userId, String password);
	
	@Query("update User c set c =:user where c.userId = :userId")
	void updateUserById(User user,int userId);
}
