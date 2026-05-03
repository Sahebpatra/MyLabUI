import { Validators } from '@angular/forms';

export interface SelectOption {
  displayText: string;
  valueCode: any;
}

export interface ControlConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'tel' | 'date' | 'time' | 'select' | 'textarea' | 'hidden' | 'checkbox' |'radio' | 'richtext';
  value?: any;
  placeholder?: string;
  gridClass?: string; // e.g., 'col-md-4' or 'col-lg-3'
  options?: SelectOption[]; // For static lists like 'Age Type'
  asyncOptionsKey?: string; // For API lists like 'Gender' from MasterService
  apiUrl?: string; // For dynamic options
  dependsOn?: string; // Names of other controls this one depends on (for dynamic option fetching)
  validators?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    email?: boolean;
    min?: number;
    max?: number;
  };
  validationMsg?: string; // Custom validation message
}

export interface DynamicFormConfig {
  title: string;
  buttonPlacement?: 'top' | 'bottom';
  saveLabel?: string | null;
  cancelLabel?: string | null;
  controls: ControlConfig[];
}