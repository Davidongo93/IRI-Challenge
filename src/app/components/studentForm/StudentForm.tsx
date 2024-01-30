import React, { useState, useEffect } from "react";
import { IFormData } from "@/app/interfaces/formInterface";
import { validateStudentForm } from "@/app/helpers/validator";

const StudentForm: React.FC<{ onSubmit: (data: IFormData) => void }> = ({ onSubmit }) => {
  const [studentName, setStudentName] = useState("");
  const [hours, setHours] = useState("");
  const [progress, setProgress] = useState("");
  const [formErrors, setFormErrors] = useState<{ studentName?: string[]; hours?: string[] }>({});

  useEffect(() => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      studentName: validateStudentForm(studentName, hours, progress).studentName,
      hours: validateStudentForm(studentName, hours, progress).hours,
    }));
  }, [studentName, hours, progress]);

  const isFormValid = () => {
    // Verificar si hay errores y si los campos no están vacíos
    const hasErrors = Object.keys(formErrors).some((key) => formErrors[key]?.length > 0);
    const isNotEmpty = studentName.trim() !== "" && hours.trim() !== "" && progress.trim() !== "";

    return !hasErrors && isNotEmpty;
  };

  const handleSubmit = () => {
    const isValid = isFormValid();

    if (isValid) {
      onSubmit({ studentName, hours, progress });
      setStudentName("");
      setHours("");
      setProgress("");
    }
  };

  return (
    <div className="student-form bg-gray-800 bg-opacity-50 rounded-md p-8 shadow-lg transition-shadow duration-600 hover:shadow-2xl">
      <h2 className="text-tahiti mb-4 w-full">Student Information</h2>
      <label className="text-tahiti block mb-4 w-full">
        Student Name:
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className={`border p-2 rounded-md w-full ${formErrors.studentName ? "border-red-500" : ""}`}
        />
        {formErrors.studentName && <p className="text-red-500">{formErrors.studentName[0]}</p>}
      </label>
      <label className="text-tahiti block mb-4 w-full">
        Hours with the Student This Week:
        <input
          type="text"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className={`border p-2 rounded-md w-full ${formErrors.hours ? "border-red-500" : ""}`}
        />
        {formErrors.hours && <p className="text-red-500">{formErrors.hours[0]}</p>}
      </label>
      <label className="text-tahiti block mb-4 w-full">
        Progress This Week:
        <textarea
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
      </label>
      <button
        onClick={handleSubmit}
        className={`text-tahiti p-2 rounded bg-purple-dark hover:bg-black transition-colors duration-600 mt-4 w-full ${
          !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!isFormValid()}
      >
        Submit Answers
      </button>
    </div>
  );
};

export default StudentForm;
