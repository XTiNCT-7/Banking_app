package com.xoriant.app.model;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data
@Entity
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	int userId;
	
	String mail;
	String password;
	boolean isAdmin;
	String fName;
	long accountNumber;
	String type;
	double balance;
	boolean isCustomer;
	@OneToMany(mappedBy = "user",orphanRemoval = true,fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
	@JsonManagedReference
	List<Transaction> transaction;
	
	
}
