# Clear existing data
Appointment.destroy_all
Schedule.destroy_all
Doctor.destroy_all
Patient.destroy_all
Department.destroy_all

# Departments
cardiology = Department.create!(name: "Cardiology", description: "Expert care for heart and cardiovascular conditions.")
neurology = Department.create!(name: "Neurology", description: "Advanced diagnosis and treatment for brain and nervous system disorders.")
pediatrics = Department.create!(name: "Pediatrics", description: "Comprehensive medical care for infants, children, and adolescents.")
orthopedics = Department.create!(name: "Orthopedics", description: "Specialized care for bones, joints, ligaments, tendons, and muscles.")
dermatology = Department.create!(name: "Dermatology", description: "Diagnosis and treatment of skin, hair, and nail conditions.")

# Doctors
# Cardiology
Doctor.create!(name: "Dr. John Doe", specialization: "Cardiologist", department: cardiology)
Doctor.create!(name: "Dr. Sarah Connor", specialization: "Interventional Cardiologist", department: cardiology)

# Neurology
Doctor.create!(name: "Dr. Jane Smith", specialization: "Neurologist", department: neurology)
Doctor.create!(name: "Dr. Alan Turing", specialization: "Neurosurgeon", department: neurology)

# Pediatrics
Doctor.create!(name: "Dr. Emily Brown", specialization: "Pediatrician", department: pediatrics)

# Orthopedics
Doctor.create!(name: "Dr. Gregory House", specialization: "Orthopedic Surgeon", department: orthopedics)

# Dermatology
Doctor.create!(name: "Dr. Lisa Cuddy", specialization: "Dermatologist", department: dermatology)

# Patients
patient1 = Patient.create!(name: "Alice Johnson", email: "alice@example.com", phone: "555-1234")
patient2 = Patient.create!(name: "Bob Williams", email: "bob@example.com", phone: "555-5678")

# Schedules
doctors = Doctor.all
doctors.each do |doc|
  # Create schedules for the next 3 days
  (1..3).each do |day_offset|
    Schedule.create!(
      doctor: doc, 
      start_time: day_offset.days.from_now.change(hour: 9), 
      end_time: day_offset.days.from_now.change(hour: 17), 
      available: true
    )
  end
end

puts "Seed data created successfully!"
