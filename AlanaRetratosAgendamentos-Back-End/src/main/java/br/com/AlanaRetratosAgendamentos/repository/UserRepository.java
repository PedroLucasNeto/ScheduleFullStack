package br.com.AlanaRetratosAgendamentos.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.AlanaRetratosAgendamentos.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

	Iterable<User> findByUsername(String name);
	
}
