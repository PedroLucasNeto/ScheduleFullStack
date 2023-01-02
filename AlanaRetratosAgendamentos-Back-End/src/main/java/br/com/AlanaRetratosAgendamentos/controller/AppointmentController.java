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

import br.com.AlanaRetratosAgendamentos.model.Appointment;
import br.com.AlanaRetratosAgendamentos.service.AppointmentService;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

	@Autowired
	AppointmentService appointmentService;

	@PostMapping
	ResponseEntity<Appointment> scheduleAppointment(@RequestBody Appointment appointment) {
		appointmentService.scheduleAppointment(appointment);
		return new ResponseEntity<Appointment>(appointment, HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	ResponseEntity<Appointment> deleteAppointment(@PathVariable Long id) throws Exception {
		appointmentService.deleteAppointment(id);
		return new ResponseEntity<Appointment>(HttpStatus.OK);
	}

	@PutMapping("/{id}")
	ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody Appointment appointment) throws Exception {
		Appointment newAppointment = appointmentService.updateAppointment(id, appointment);
		return new ResponseEntity<Appointment>(newAppointment, HttpStatus.OK);
	}

	@GetMapping
	ResponseEntity<List<Appointment>> listAppointments() {
		List<Appointment> appointmentList = appointmentService.listAppointments();
		return new ResponseEntity<List<Appointment>>(appointmentList, HttpStatus.OK);
	}

	@GetMapping("/id/{id}")
	ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
		Appointment appointment = appointmentService.findById(id);
		return new ResponseEntity<Appointment>(appointment, HttpStatus.OK);
	}

	@GetMapping("/clientName/{clientName}")
	ResponseEntity<List<Appointment>> getClientAppointments(@PathVariable String clientName) {
		return new ResponseEntity<List<Appointment>>(appointmentService.findByClientName(clientName), HttpStatus.OK);
	}
}
