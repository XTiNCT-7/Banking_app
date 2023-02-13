package com.xoriant.app.resource;

import java.util.List;

import com.xoriant.app.model.Transaction;
import com.xoriant.app.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionController {
	@Autowired
	public TransactionService transSer;
	
	@PostMapping("/")
	public void addTransaction(@RequestBody Transaction transaction) {
		transSer.addTransaction(transaction);
	}
	
	@GetMapping("/")
	public List<Transaction> getallUser(){
		return transSer.getAllTransaction();
	}
}
