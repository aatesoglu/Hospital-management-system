# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_11_21_144544) do
  create_table "appointments", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "doctor_id", null: false
    t.integer "patient_id", null: false
    t.integer "schedule_id", null: false
    t.string "status"
    t.datetime "updated_at", null: false
    t.index ["doctor_id"], name: "index_appointments_on_doctor_id"
    t.index ["patient_id"], name: "index_appointments_on_patient_id"
    t.index ["schedule_id"], name: "index_appointments_on_schedule_id"
  end

  create_table "departments", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.string "name"
    t.datetime "updated_at", null: false
  end

  create_table "doctors", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "department_id", null: false
    t.string "name"
    t.string "specialization"
    t.datetime "updated_at", null: false
    t.index ["department_id"], name: "index_doctors_on_department_id"
  end

  create_table "patients", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "name"
    t.string "phone"
    t.datetime "updated_at", null: false
  end

  create_table "schedules", force: :cascade do |t|
    t.boolean "available"
    t.datetime "created_at", null: false
    t.integer "doctor_id", null: false
    t.datetime "end_time"
    t.datetime "start_time"
    t.datetime "updated_at", null: false
    t.index ["doctor_id"], name: "index_schedules_on_doctor_id"
  end

  add_foreign_key "appointments", "doctors"
  add_foreign_key "appointments", "patients"
  add_foreign_key "appointments", "schedules"
  add_foreign_key "doctors", "departments"
  add_foreign_key "schedules", "doctors"
end
