package com.xoriant.app.service;

import java.util.List;

import com.xoriant.app.model.User;

public interface UserService {
	public List<User> getallUser();
	public void addUser(User user);
	public void deleteUser(int userId);
	public User getUserById(int userId);
	public void changePassword(int userId,String password);
	public void updateUserById(User user,int userId);
	public void balanceUpdate(int userId,double balance,String op);
	
}
