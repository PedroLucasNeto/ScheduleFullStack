package br.com.AlanaRetratosAgendamentos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.AlanaRetratosAgendamentos.model.User;
import br.com.AlanaRetratosAgendamentos.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping 
	ResponseEntity<User> createUser(@RequestBody User user) {
		boolean success = userService.createUser(user);
		if (success) {
			return new ResponseEntity<User>(HttpStatus.CREATED);
		}
		return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
	}
	

	@DeleteMapping 
	ResponseEntity<User> deleteUser(@PathVariable Long id) throws Exception {
		userService.deleteUser(id);
			return new ResponseEntity<User>(HttpStatus.OK);
	}

	@PutMapping("/{id}") 
	ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) throws Exception {
		userService.updateUser(id, user);
		return new ResponseEntity<User>(HttpStatus.OK);
	}
	
	@GetMapping
	ResponseEntity <Iterable<User>> listUsers(){
		Iterable<User> listUsers = userService.listUsers();
		return new ResponseEntity<Iterable<User>>(listUsers, HttpStatus.OK);
	}
	
	@GetMapping("/{name}")
	ResponseEntity<Iterable<User>> getUserByName(@PathVariable String name){
		List<User> users = (List<User>) userService.findByName(name);
		if (users.isEmpty()) {
			return new ResponseEntity<Iterable<User>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Iterable<User>>(users, HttpStatus.OK);
	}
	
	@GetMapping("/id/{id}")
	ResponseEntity<User> getUserById(@PathVariable Long id) throws Exception{
		User user = userService.findById(id);
		if (user.equals(null)) {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}


}
