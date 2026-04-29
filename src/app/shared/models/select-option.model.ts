export interface DropDownItems {
  id: number;
  dropdownType: string | null;
  valueCode: string | string | null;
  displayText: string | null;
  sortOrder: number | null;
  isActive: boolean;
  labId: number | null;
  serviceId: number | null;
  isDeafaultSelected: boolean;
  createdOn: string;
  createdBy: number;
  updatedOn: string | null;
  updatedBy: number | null;
}
export interface SelectOption {
  value: string | number;
  label: string;
}
