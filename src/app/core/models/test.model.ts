import { TestParameterModel } from "./test-parameter.model";

export interface TestModel {
    testId: number;
    testType: number;
    testTypeText: string | null;
    department: number;
    departmentText: string | null;
    testDesc: string | null;
    testCode: string | null;
    price: number | 0;
    barCodeSuffix: string | null;
    sample: number | null;
    sampleText: string | null;
    sampleColor: number | null;
    sampleColorText: string | null;
    gender: number;
    genderText : string | null;
    requiredField: string;
    collectionGuidline: string | null;
    // guidlineAttachment: FormFile | null;
    isActive: boolean;
    addedBy: string;
    addedOn: string;
    updatedBy: string;
    updatedOn: string;
    details: string | null;// This can be a JSON string or an array of TestDetail/TestParameters objects
}
export class TestModelClass implements TestModel {
  testId = 0;
  testType = 0;
  testTypeText = null;
  department = 0;
  departmentText = null;
  testDesc = null;
  testCode = null;
  price = 0;
  barCodeSuffix = null;
  sample = 0;
  sampleText = null;
  sampleColor = 0;
  sampleColorText = null;
  gender = 3;
  genderText = '';
  requiredField = '';
  collectionGuidline = '';
  isActive = true;
  addedBy = '';
  addedOn = new Date().toISOString();
  updatedBy = '';
  updatedOn = new Date().toISOString();
  details = null;
}