import React, { useState } from "react";
import { FormData } from "@/app/interfaces/formInterface";

const StudentForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({ onSubmit }) => {
  const [studentName, setStudentName] = useState("");
  const [hours, setHours] = useState("");
  const [progress, setProgress] = useState("");

  const handleSubmit = () => {
    // Here you can send the data to AirTable 2
    // We'll simply call the function provided by `onSubmit` for this example.
    onSubmit({ studentName, hours, progress });
  };

  return (
    <div className="student-form bg-gray-800 bg-opacity-50 rounded-md p-8 shadow-lg transition-shadow duration-600 hover:shadow-2xl">
      <h2 className="text-tahiti mb-4 w-full">Student Information</h2>
      <label className="text-white block mb-4 text-tahiti w-full">
        Student Name:
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
      </label>
      <label className="text-white block mb-4 text-tahiti w-full">
        Hours with the Student This Week:
        <input
          type="text"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
      </label>
      <label className="text-white block mb-4 text-tahiti w-full">
        Progress This Week:
        <textarea
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
      </label>
      <button
        onClick={handleSubmit}
        className="text-tahiti p-2 rounded bg-purple-dark hover:bg-black transition-colors duration-600 mt-4 w-full"
      >
        Submit Answers
      </button>
    </div>
  );
};

export default StudentForm;
