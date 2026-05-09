export interface DynamicTableConfig {
  //columns: IDynamicTableColumn[];
  tableData?: any[] | null; // Accept table data as an input
  primaryKey: string;
  title: string;
  buttonPlacement: 'top' | 'bottom';
  excludeColumns?: string[];
  actions: ITableAction[];
  AddNewButton?: IAddNewButton;
}

interface IAddNewButton {
  ButtonText: string | null;
  icon: string | null;
  class: string | null;
  redirectTo?: string | null;
}
interface ITableAction {
  label: string;
  icon: string;
  class: string;
  actionKey: string; // e.g., 'edit', 'delete', 'view', 'approve'
  redirectTo?: string | null; // Optional: URL to redirect on action
}
// export interface IDynamicTableColumn {
//   key: string;
//   label: string;
//   type: 'text' | 'button';
// }
