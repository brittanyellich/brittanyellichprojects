import React, { useState } from "react";
import { format } from "date-fns";
import Modal from "react-modal";

import "./HabitTracker.scss";
import {
  getHabitTrackerData,
  updateTrackerData,
  addNewHabit,
} from "../../utils/habitTrackerData";
import Button from "../../components/Button/Button";

const MAX_HABITS = 10;

function HabitTracker() {
  const today = new Date();
  const [habitTrackerData, setHabitTrackerData] = useState(
    getHabitTrackerData(today)
  );
  const [editTitleModalOpen, setEditTitleModalOpen] = useState(false);

  console.log(habitTrackerData);

  const monthTitle = format(today, "MMMM yyyy");

  const updateTracker = () => {
    setHabitTrackerData(getHabitTrackerData(today));
  };

  const addHabit = () => {
    if (habitTrackerData.length < MAX_HABITS) {
      addNewHabit(today);
      setHabitTrackerData(getHabitTrackerData(today));
    }
  };

  return (
    <div className="habit-tracker">
      <div className="habit-tracker__title">Habit Tracker</div>
      <div className="habit-tracker__title-month">{monthTitle}</div>
      <Button onClick={addHabit} text="Add habit" />
      <div className="habit-tracker__tracker">
        <div className="habit-tracker__tracker-header">
          <div className="habit-tracker__tracker-title">Habit</div>
          {habitTrackerData[0].data.map((day, index) => (
            <div
              className="habit-tracker__tracker-grid-value"
              key={`habit-tracker-grid-header-${index}`}
            >
              {index + 1}
            </div>
          ))}
          <div className="habit-tracker__tracker-grid-value">% completed</div>
        </div>
        {habitTrackerData.map((tracker, index) => (
          <div key={`habit-tracker-${index}`}>
            <div
              className="habit-tracker__tracker-title"
              onClick={() => setEditTitleModalOpen(true)}
            >
              {tracker.title}
            </div>
            <div className="habit-tracker__tracker-grid">
              {tracker.data.map((day, dayIndex) => (
                <div
                  className="habit-tracker__tracker-grid-value"
                  key={`habit-tracker-grid-${index}-${dayIndex}`}
                >
                  <input
                    type="checkbox"
                    defaultChecked={day === 1}
                    onChange={(event) => {
                      updateTrackerData(
                        today,
                        index,
                        dayIndex,
                        event.target.checked
                      );
                      updateTracker();
                    }}
                  />
                </div>
              ))}
              <div className="habit-tracker__tracker-grid-value">
                {Math.floor(
                  (tracker.data.reduce(
                    (total, value) => (total = total + value),
                    0
                  ) /
                    tracker.data.length) *
                    100
                )}{" "}
                %
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={editTitleModalOpen}>
        <Button text="Close" onClick={() => setEditTitleModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default HabitTracker;
