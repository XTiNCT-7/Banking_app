package com.xoriant.app.service;

import java.util.List;

import com.xoriant.app.model.Transaction;

public interface TransactionService {
	public List<Transaction> getAllTransaction();
	public void addTransaction(Transaction transaction);
	
}
