export interface TestParameterModel {
  RowId: number;
  TestId: number;
  TestDetailsID: number;
  TestName: string;
  FieldType: number | string; // "1" for Single, "2" for Multi
  TestMethod?: string;
  UnitFieldType?: number | string; // 0 for None, 1 for Unit, 2 for Reference Range
  Unit?: string;
  ResultRangeMin?: string;
  ResultRangeMax?: string;
  CriticalRange?: boolean;
  CriticalRangeMin?: string;
  CriticalRangeMax?: string;
  ResultOperator?: number | string; // 0 for None, 1 for <= =>, 2 for >, 3 for <, 4 for =,5 for >=,6 for <=
  ParrentId: number;
  Children?: TestParameterModel[];    
  isExpanded?: boolean; // UI state
}