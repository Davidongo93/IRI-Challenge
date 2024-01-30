import React, { useState } from "react";
import { IFormData } from "@/app/interfaces/formInterface";
import { validateStudentForm } from "@/app/helpers/validator";

const StudentForm: React.FC<{
  onSubmit: (studentName: string, hours: string, progress: string) => void;
}> = ({ onSubmit }) => {
  const [studentName, setStudentName] = useState("");
  const [hours, setHours] = useState("");
  const [progress, setProgress] = useState("");
  const [formErrors, setFormErrors] = useState<{ studentName?: string[]; hours?: string[] }>({});

  const handleSubmit = () => {
    const errors = validateStudentForm(studentName, hours, progress);
  
    if (Object.keys(errors).length === 0) {
      // Llamar a la función onSubmit para enviar la información a la API
      onSubmit(studentName, hours, progress);
  
      // Limpiar los campos después de enviar la información
      setStudentName("");
      setHours("");
      setProgress("");
    } else {
      setFormErrors(errors);
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
          className={`border p-2 rounded-md w-full ${formErrors.studentName ? 'border-red-500' : ''}`}
        />
        {formErrors.studentName && (
          <p className="text-red-500">{formErrors.studentName[0]}</p>
        )}
      </label>
      <label className="text-tahiti block mb-4 w-full">
        Hours with the Student This Week:
        <input
          type="text"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className={`border p-2 rounded-md w-full ${formErrors.hours ? 'border-red-500' : ''}`}
        />
        {formErrors.hours && (
          <p className="text-red-500">{formErrors.hours[0]}</p>
        )}
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
  onClick={() => handleSubmit()}
  className={`text-tahiti p-2 rounded bg-purple-dark hover:bg-black transition-colors duration-600 mt-4 w-full ${
    Object.keys(formErrors).length > 0 ? 'opacity-50 cursor-not-allowed' : ''
  }`}
  disabled={Object.keys(formErrors).length > 0}
>
  Submit Answers
</button>
    </div>
  );
};

export default StudentForm;
