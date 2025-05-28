export interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

interface Option {
  label: string;
  value: string;
}

export interface SelectInputProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
}

export interface PasswordInputProps {
  name: string;
  label: string;
  placeholder?: string;
}