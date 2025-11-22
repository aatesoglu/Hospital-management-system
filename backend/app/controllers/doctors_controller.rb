class DoctorsController < ApplicationController
  def index
    doctors = Doctor.all
    doctors = doctors.where(department_id: params[:department_id]) if params[:department_id]
    render json: doctors, include: :department
  end

  def show
    render json: Doctor.find(params[:id]), include: :department
  end
end
