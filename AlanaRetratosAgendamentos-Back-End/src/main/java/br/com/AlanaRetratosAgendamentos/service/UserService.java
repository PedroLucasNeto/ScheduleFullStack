package br.com.AlanaRetratosAgendamentos.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.AlanaRetratosAgendamentos.model.User;
import br.com.AlanaRetratosAgendamentos.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	public boolean createUser(User user) {

		if (user != null) {
			userRepository.save(user);
			return true;
		}
		return false;
	}

	public void deleteUser(Long id) throws Exception {
		User deleteUser = userRepository.findById(id)
				.orElseThrow(() -> new Exception("We're sorry. We could not find an User with this ID: " + id));
			userRepository.delete(deleteUser);
	}

	public User updateUser(Long id, User user) throws Exception {
		User updatedUser = userRepository.findById(id)
				.orElseThrow(() -> new Exception("We're sorry. We could not find an User with this ID: " + id));
		updatedUser.setPassword(user.getPassword());
		updatedUser.setUsername(user.getUsername());
		userRepository.save(updatedUser);
		return updatedUser;

	}

	public Iterable<User> listUsers() {
		Iterable<User> listUsers= userRepository.findAll();
 		return listUsers;
	}

	public Iterable<User> findByName(String name) {
		Iterable<User> users = userRepository.findByUsername(name);
		return users;
	}

	public User findById(Long id) throws Exception{
		User user = userRepository.findById(id)
				.orElseThrow(() -> new Exception("We're sorry. We could not find an User with this ID: " + id));
		return user;
	}

}
