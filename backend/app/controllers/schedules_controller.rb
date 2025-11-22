class SchedulesController < ApplicationController
  def index
    schedules = Schedule.where(available: true)
    schedules = schedules.where(doctor_id: params[:doctor_id]) if params[:doctor_id]
    render json: schedules
  end
end
