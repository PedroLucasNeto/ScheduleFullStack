package br.com.AlanaRetratosAgendamentos.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.com.AlanaRetratosAgendamentos.model.Appointment;

public interface AppointmentRepository extends CrudRepository<Appointment, Long>{

	public  List<Appointment> findByClientName(String clientName);
	
}
