package com.xoriant.app.service;

import java.util.List;

import com.xoriant.app.model.User;
import com.xoriant.app.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userSer;

	@Override
	public List<User> getallUser() {
		// TODO Auto-generated method stub
		return userSer.findAll();
	}

	@Override
	public void addUser(User user) {
		// TODO Auto-generated method stub
		userSer.save(user);
	}

	@Override
	public void deleteUser(int userId) {
		// TODO Auto-generated method stub
		userSer.deleteById(userId);
	}

	@Override
	public User getUserById(int userId) {
		return userSer.getByUserId(userId);
		// TODO Auto-generated method stub
		
	}

	@Override
	public void changePassword(int userId, String password) {
		// TODO Auto-generated method stub
//		User newUser = userSer.getByUserId(userId);
//		newUser.setPassword(password);
//		userSer.save(newUser);
		userSer.changePassword(userId, password);
	}

	@Override
	public void updateUserById(User user,int userId) {
		// TODO Auto-generated method stub
		userSer.updateUserById(user, userId);;
	}

	@Override
	public void balanceUpdate(int userId,double balance,String op) {
		// TODO Auto-generated method stub
		User user = userSer.getByUserId(userId);
		double amount = user.getBalance();
		if(op.equals("credit")) {
			user.setBalance(amount+balance);
		}else {
			user.setBalance(amount-balance);
		}
		userSer.save(user);
	}


	
}
