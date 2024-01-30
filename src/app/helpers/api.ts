import axios from 'axios';

interface AirtableRecordFields {
  username: string;
  email: string;
  password: string;
}

interface AirtableRecord {
  id: string;
  createdTime: string;
  fields: AirtableRecordFields;
}

interface AirtableResponse {
  records: AirtableRecord[];
}

export const loginUser = async (email: string, password: string): Promise<{ username: string }> => {
  const baseURL = 'https://api.airtable.com/v0/appwJkKjeYJE71e3Q/IRIMentors';
  const filterFormula = `AND({email}='${email}', {password}='${password}')`;

  console.log(email, password);

  try {
    const response = await axios.get<AirtableResponse>(`${baseURL}?filterByFormula=${encodeURIComponent(filterFormula)}`, {
      headers: {
        Authorization: 'Bearer pat53V1GN55JPxHvj.93e40dc9142564beebfe53b167f7ddfe480a928060b49d3afe867abd25b7907b',
      },
    });

    const { records } = response.data;

    console.log(records);

    if (records.length > 0) {
      const user = records[0].fields;
      console.log('Login successful for user:', user.username);
      return { username: user.username };
    } else {
      console.log('Login failed. Invalid email or password.');
      throw new Error('Login failed. Invalid email or password.');
    }
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
};

export const addMentorReport = async (studentName: string, hours: string, progress: string): Promise<void> => {
  const baseURL = 'https://api.airtable.com/v0/appwJkKjeYJE71e3Q/mentorReport';
console.log(studentName,hours,progress);

const data = {
  records: [
    {
      fields: {
        studentName,
        hours: Number(hours),
        progress,
      },
    },
  ],
};


  try {
    await axios.post<AirtableRecord>(baseURL, data, {
      headers: {
        Authorization: 'Bearer pat53V1GN55JPxHvj.93e40dc9142564beebfe53b167f7ddfe480a928060b49d3afe867abd25b7907b',
        'Content-Type': 'application/json',
      },
    });

    console.log('Mentor report added successfully.');
  } catch (error) {
    console.error('Error adding mentor report:', error);
    throw error; // Re-lanzar el error después de imprimirlo para que puedas ver detalles en la consola
  }
};
