package com.xoriant.app.resource;

import java.util.List;

import com.xoriant.app.model.User;
import com.xoriant.app.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
	
	@Autowired
	public UserService userService;
	
	@PostMapping("/")
	public void addUser(@RequestBody User user) {
		userService.addUser(user);
	}
	
	@GetMapping("/")
	public List<User> getallUser(){
		return userService.getallUser();
	}
	
	@GetMapping("/{id}")
	public User getUserById(@PathVariable("id") int userId) {
		return userService.getUserById(userId);
	}
	
	@PostMapping("/balance/{id}")
	public void balanceUpdate(@PathVariable("id") int userId,int balance,String op) {
		userService.balanceUpdate(userId, balance, op);
	}



//	@PostMapping("/update/{id}")
//	public void updateUser(@RequestBody User user,@PathVariable("id") int userId) {
//		userService.updateUserById(user, userId);
//	}
	
}
