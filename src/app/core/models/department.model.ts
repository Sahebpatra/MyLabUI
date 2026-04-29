export interface DepartmentModel {
  deptId: number;
  deptName: string;
  isActive: boolean;
  createdBy?: number | null;
  updatedBy?: number | null;
  createdAt: Date | string;
  updatedAt?: Date | string | null;
}