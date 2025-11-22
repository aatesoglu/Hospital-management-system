class DepartmentsController < ApplicationController
  def index
    render json: Department.all
  end

  def show
    render json: Department.find(params[:id])
  end
end
