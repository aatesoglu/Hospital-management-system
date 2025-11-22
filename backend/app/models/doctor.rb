class Doctor < ApplicationRecord
  belongs_to :department
  has_many :schedules
end
