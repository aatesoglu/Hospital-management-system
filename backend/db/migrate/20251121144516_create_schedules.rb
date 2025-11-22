class CreateSchedules < ActiveRecord::Migration[8.1]
  def change
    create_table :schedules do |t|
      t.references :doctor, null: false, foreign_key: true
      t.datetime :start_time
      t.datetime :end_time
      t.boolean :available

      t.timestamps
    end
  end
end
