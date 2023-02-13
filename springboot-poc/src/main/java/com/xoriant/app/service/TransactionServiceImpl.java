package com.xoriant.app.service;

import java.util.List;

import com.xoriant.app.model.Transaction;
import com.xoriant.app.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceImpl implements TransactionService {
	
	@Autowired
	private TransactionRepository transRep;
	
	@Autowired
	private UserService userSer;
	
	@Override
	public List<Transaction> getAllTransaction() {
		// TODO Auto-generated method stub
		return transRep.findAll();
	}

	@Override
	public void addTransaction(Transaction transaction) {
		transRep.save(transaction);
		userSer.balanceUpdate(transaction.getUser().getUserId(), transaction.getTransactionAmount(), transaction.getType());
	}

}
