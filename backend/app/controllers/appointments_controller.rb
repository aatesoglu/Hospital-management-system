class AppointmentsController < ApplicationController
  def index
    render json: Appointment.all
  end

  def create
    # Simple logic: Create patient if not exists (by email) or just use ID
    # For this demo, we'll expect patient_id or create a patient if params provided
    
    if params[:patient]
      patient = Patient.find_or_create_by(email: params[:patient][:email]) do |p|
        p.name = params[:patient][:name]
        p.phone = params[:patient][:phone]
      end
      params[:appointment][:patient_id] = patient.id
    end

    appointment = Appointment.new(appointment_params)
    
    if appointment.save
      # Mark schedule as unavailable
      appointment.schedule.update(available: false) if appointment.schedule
      render json: appointment, status: :created
    else
      render json: appointment.errors, status: :unprocessable_entity
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:doctor_id, :patient_id, :schedule_id, :status)
  end
end
