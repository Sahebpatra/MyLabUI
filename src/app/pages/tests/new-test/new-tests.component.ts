import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MasterDataService } from '../../../core/services/common/master-data.service';
import { DropDownItems } from '../../../core/models/DropDownItam';
import { ApiResponse } from '../../../core/models/apiResponse';
import { CommonModule } from '@angular/common';
import { DepartmentModel } from '../../../core/models/departments';
import { ParametersComponent } from './parameters/parameters.component';
import { TestParameterModel } from '../../../core/models/TestParameterModel';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TestModelClass } from '../../../core/models/TestModel';
import { LabTestService } from '../../../core/services/lab-test.service';
import { NotificationService } from '../../../core/services/common/notification.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RichTextComponent } from '../../../shared/components/rich-text/rich-text.component';

@Component({
  selector: 'app-new-tests',
  standalone: true,
  imports: [
    CommonModule,
    ParametersComponent,
    ReactiveFormsModule,
    RouterLink,
    RichTextComponent,
  ],
  templateUrl: './new-tests.component.html',
  styleUrl: './new-tests.component.css',
})
export class NewTestsComponent implements OnInit {
  private masterService = inject(MasterDataService);
  private testService = inject(LabTestService);
  private notify: NotificationService = inject(NotificationService);
  private activeroute = inject(ActivatedRoute);
  private router = inject(Router);

  departmentList: DepartmentModel[] = [];
  testType: DropDownItems[] = [];
  sample: DropDownItems[] = [];
  sampleColor: DropDownItems[] = [];
  unitFieldType: DropDownItems[] = [];
  gender: DropDownItems[] = [];
  reqField: DropDownItems[] = [];
  parameterList: TestParameterModel[] = [];

  testForm!: FormGroup;
  testId: number | null = null;
  isEditMode = false;

  @ViewChild('guidelineModal') guidelineModal!: RichTextComponent;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const id = this.activeroute.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.testId = +id;
      this.getTestById(this.testId);
    }
    this.getOptionItems();
    this.GetDepartmentList();
    this.initTestForm();
  }
  initTestForm() {
    this.testForm = this.fb.group(new TestModelClass());
  }

  getTestById(id: number) {
    this.testService.getTestById(id).subscribe({
      next: (res) => {
        //console.log(res);
        if (res.success) {
          const testData = res.data[0];
          this.testForm.patchValue(testData);
          if (testData.details) {
            this.parameterList = [...JSON.parse(testData.details)];
            //console.log(this.parameterList);
          }
        }
      },
    });
  }

  onTestSubmit() {
    if (this.testForm.valid) {
      const testData = {
        ...this.testForm.value,
        testId: this.testId || 0, // 0 for new, actual ID for edit
        details: JSON.stringify(this.parameterList),
      };
      //console.log(testData);

      this.testService.submitTest(testData).subscribe({
        next: (res: ApiResponse<any>) => {
          //console.log('Success:', res);
          if (res.success) {
            // alert(res.message);
            this.notify.showSuccess(res.message);
            this.initTestForm();
            this.parameterList = [];
            this.router.navigate(['admin/test-list']);
          } else {
            // alert(res.message);
            this.notify.showError(res.message);
          }
        },
        error: (err) => {
          console.error('Submission Error:', err.error);
          this.notify.showError('An error occurred while submitting the test.');
        },
      });
    }
  }
  onParamsListUpdate(updatedList: TestParameterModel[]) {
    this.parameterList = updatedList;
    console.log('Received list from child:', this.parameterList);
  }
  getOptionItems(): void {
    this.masterService
      .getDropdownItems()
      .subscribe((res: ApiResponse<DropDownItems[]>) => {
        this.testType = res.data.filter((x) => x.dropdownType === 'TestType');
        this.sample = res.data.filter((x) => x.dropdownType === 'Sample');
        this.sampleColor = res.data.filter(
          (x) => x.dropdownType === 'SampleColor',
        );
        this.unitFieldType = res.data.filter(
          (x) => x.dropdownType === 'UnitFieldType',
        );
        this.gender = res.data
          .filter((x) => x.dropdownType === 'Gender')
          .map((x) => ({
            ...x,
            valueCode: Number(x.valueCode), // Convert string "3" to number 3
          }));
        this.reqField = res.data.filter(
          (x) => x.dropdownType === 'RequiredFields',
        );
      });
  }
  GetDepartmentList(): void {
    this.masterService
      .getDepartmentList()
      .subscribe((res: ApiResponse<DepartmentModel[]>) => {
        this.departmentList = res.data;
        //console.log(res.data);
      });
  }
  onGuidelineChange() {
      this.guidelineModal.show();
  }
  
  getControl(name: string): FormControl {
    const control = this.testForm.get(name);
    if (!control) {
      throw new Error(`Control ${name} not found in form`);
    }
    return control as FormControl;
  }
}
