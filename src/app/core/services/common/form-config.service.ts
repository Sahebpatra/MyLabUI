import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DynamicFormConfig } from '../../../shared/models/dynamic-form.model';
import { CommonHttpService } from './common-http.service';

@Injectable({
  providedIn: 'root',
})
export class FormConfigService {
  private http = inject(CommonHttpService);

  getFormConfiguration(formKey: string): Observable<DynamicFormConfig> {
    const registry: { [key: string]: DynamicFormConfig } = {
      TEST_REG: {
        title: '',
        buttonPlacement: 'top',
        saveLabel: 'Submit Test',
        cancelLabel: 'Back',
        controls: [
          { name: 'testId', label: 'ID', type: 'hidden' },
           {
            name: 'testType',
            label: 'Test Type',
            type: 'select',
            gridClass: 'col-md-4 col-lg-2',
            asyncOptionsKey: 'testType$',
            validators: { required: true },
          },
          {
            name: 'department',
            label: 'Department',
            type: 'select',
            gridClass: 'col-md-4 col-lg-2',
            asyncOptionsKey: 'departments$',
            validators: { required: true },
          },
          {
            name: 'testDesc',
            label: 'Test Name',
            type: 'text',
            gridClass: 'col-md-4 col-lg-4',
            placeholder: 'Enter test name',
            validators: { required: true },
            validationMsg: 'Test name is required.',
          },
          {
            name: 'testCode',
            label: 'Test Code',
            type: 'text',
            gridClass: 'col-md-4 col-lg-2',
          },
          {
            name: 'price',
            label: 'Price',
            type: 'number',
            gridClass: 'col-md-4 col-lg-2',
            validators: { required: true },
          },
          {
            name: 'sample',
            label: 'Sample',
            type: 'select',
            gridClass: 'col-md-4 col-lg-2',
            asyncOptionsKey: 'samples$',
            validators: { required: true },
          },
          {
            name: 'sampleColor',
            label: 'Sample Color',
            type: 'select',
            gridClass: 'col-md-4 col-lg-2',
            asyncOptionsKey: 'sampleColors$',
          },
          {
            name: 'barCodeSuffix',
            label: 'Barcode Suffix',
            type: 'text',
            gridClass: 'col-md-4 col-lg-3',
          },
          {
            name: 'gender',
            label: 'Gender',
            type: 'radio',
            gridClass: 'col-md-6 col-lg-3',
            asyncOptionsKey: 'testGender$',
            validators: { required: true },
          },
          {
            name: 'collectionGuidline',
            label: 'Collection Guidelines',
            type: 'richtext',
            gridClass: 'col-md-4 col-lg-2',
          },
          {
            name: 'requiredField',
            label: 'Required Fields',
            type: 'radio',
            gridClass: 'col-md-6 col-lg-6',
            asyncOptionsKey: 'reqFields$',
            value: '1',
          },
        ],
      },
      PATIENT_REG: {
        title: 'Add/Edit Patient Details',
        buttonPlacement: 'bottom',
        saveLabel: 'Save Patient',
        cancelLabel: 'Back',
        controls: [
          { name: 'id', label: 'ID', type: 'hidden' },

          // Personal Info
          {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            gridClass: 'col-md-4 col-lg-3',
            placeholder: 'Enter first name',
            validators: { required: true, minLength: 2 },
            validationMsg: 'First name is required.',
          },
          {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            gridClass: 'col-md-4 col-lg-3',
            placeholder: 'Enter last name',
          },
          {
            name: 'age',
            label: 'Age',
            type: 'number',
            gridClass: 'col-md-2 col-lg-2',
            validators: { required: true, min: 0 },
            validationMsg: 'Age is required.',
          },
          {
            name: 'ageType',
            label: 'Age Type',
            type: 'select',
            gridClass: 'col-md-2 col-lg-2',
            options: [
              { displayText: 'Years', valueCode: 'Years' },
              { displayText: 'Months', valueCode: 'Months' },
              { displayText: 'Days', valueCode: 'Days' },
            ],
            value: 'Years',
          },
          {
            name: 'genderId',
            label: 'Gender',
            type: 'select',
            gridClass: 'col-md-2 col-lg-2',
            asyncOptionsKey: 'gender$',
            validators: { required: true },
            validationMsg: 'Gender is required.',
          },
          {
            name: 'address',
            label: 'Address',
            type: 'textarea',
            gridClass: 'col-md-12 col-lg-12',
            placeholder: 'Full address',
          },
          {
            name: 'phone',
            label: 'Phone',
            type: 'tel',
            gridClass: 'col-md-4 col-lg-3',
            placeholder: '10-digit number',
            validators: { pattern: '^[0-9]{10}$' },
            validationMsg: 'Enter 10-digit phone number.',
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            gridClass: 'col-md-4 col-lg-3',
            placeholder: 'example@mail.com',
            validators: { email: true },
          },
          {
            name: 'referringPhysician',
            label: 'Referring Physician',
            type: 'select',
            gridClass: 'col-md-4 col-lg-3',
            apiUrl: 'masters/get-doctors',
          },
          {
            name: 'phlebotomist',
            label: 'Phlebotomist',
            type: 'select',
            gridClass: 'col-md-4 col-lg-3',
            apiUrl: 'Staff/GetPhlebotomists',
          },
          {
            name: 'barcode',
            label: 'Barcode',
            type: 'text',
            gridClass: 'col-md-4 col-lg-3',
          },
          {
            name: 'collectionDate',
            label: 'Collection Date',
            type: 'date',
            gridClass: 'col-md-3 col-lg-3',
          },
          {
            name: 'collectionTime',
            label: 'Collection Time',
            type: 'time',
            gridClass: 'col-md-3 col-lg-2',
          },
          {
            name: 'weight',
            label: 'Weight (kg)',
            type: 'number',
            gridClass: 'col-md-3 col-lg-2',
          },
          {
            name: 'height',
            label: 'Height (cm)',
            type: 'number',
            gridClass: 'col-md-3 col-lg-2',
          },
        ],
      },
    };

    return of(registry[formKey]);
  }
}
