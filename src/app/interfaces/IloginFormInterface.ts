import { ILoginData } from '@/app/interfaces/authInterface';
export interface ILoginFormProps {
    onLogin: (data: ILoginData) => void;
  }
