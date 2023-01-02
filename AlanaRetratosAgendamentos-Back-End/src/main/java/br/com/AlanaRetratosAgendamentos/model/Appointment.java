package br.com.AlanaRetratosAgendamentos.model;


import java.util.Date;

import br.com.AlanaRetratosAgendamentos.enums.AppointmentType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="tb_appointment")
public class Appointment {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@Column
	private String description;
	
	@Column
	private Date date;
	
	@Column
	private AppointmentType appointmentType;
	
	@Column
	private String clientName;
	
	@Column
	private AppointmentStatus appointmentStatus;
	
	
}

//Agendado, produzido, entregue, finalizado;