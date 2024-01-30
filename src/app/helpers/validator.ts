export const validateEmail = (email: string): string[] => {
    const errors: string[] = [];
  
    if (!email.trim()) {
      errors.push('Email is required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Invalid email format');
      }
    }
  
    return errors;
  };
  
  export const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
  
    if (!password.trim()) {
      errors.push('Password is required');
    } else if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
  
    return errors;
  };

  export const validateStudentForm = (studentName: string, hours: string, progress: string) => {
    const errors: { [key: string]: string[] } = {};
  
    if (!studentName.trim()) {
      errors.studentName = ["Student Name is required"];
    }
  
    if (!hours.trim() || !Number.isInteger(Number(hours))) {
      errors.hours = ["Hours must be a non-empty integer"];
    }
  
    return errors;
  };
  