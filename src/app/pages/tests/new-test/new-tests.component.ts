import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MasterDataService } from '../../../core/services/common/master-data.service';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { CommonModule } from '@angular/common';
import { ParametersComponent } from './parameters/parameters.component';
import { TestParameterModel } from '../../../core/models/test-parameter.model';
import {
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { TestModelClass } from '../../../core/models/test.model';
import { LabTestService } from '../../../core/services/lab-test.service';
import { NotificationService } from '../../../core/services/common/notification.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RichTextComponent } from '../../../shared/components/rich-text/rich-text.component';
import { FormConfigService } from '../../../core/services/common/form-config.service';
import { DynamicFormConfig } from '../../../shared/models/dynamic-form.model';
import { Observable } from 'rxjs';
import { DynamicFormComponent } from '../../../shared/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-new-tests',
  standalone: true,
  imports: [
    CommonModule,
    ParametersComponent,
    ReactiveFormsModule,
    DynamicFormComponent
  ],
  templateUrl: './new-tests.component.html',
  styleUrl: './new-tests.component.css',
})
export class NewTestsComponent implements OnInit {
  private configService = inject(FormConfigService);
  private masterService = inject(MasterDataService);
  private testService = inject(LabTestService);
  private notify: NotificationService = inject(NotificationService);
  private activeroute = inject(ActivatedRoute);
  private router = inject(Router);

  departmentList$ = this.masterService.departments$;
  testType$ = this.masterService.testTypes$;
  sample$ = this.masterService.samples$;
  sampleColor$ = this.masterService.sampleColors$;
  unitFieldType$ = this.masterService.unitFieldTypes$;
  testGender$ = this.masterService.testGender$;
  reqField$ = this.masterService.reqFields$;

  config$!: Observable<DynamicFormConfig>;

  parameterList: TestParameterModel[] = [];
  testId: number | null = null;
  isEditMode = false;
  testData: TestModelClass | null = null;

  @ViewChild('guidelineModal') guidelineModal!: RichTextComponent;

  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    this.config$ = this.configService.getFormConfiguration('TEST_REG');
    const id = this.activeroute.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.getTestById(+id);
    }
  }

  getTestById(id: number) {
    this.testService.getTestById(id).subscribe({
      next: (res) => {
        //console.log(res);
        if (res.success) {
           this.testData = res.data[0];
          //this.testForm.patchValue(testData);
          if (this.testData?.details) {
            this.parameterList = [...JSON.parse(this.testData.details)];
            //console.log(this.parameterList);
          }
        }
      },
    });
  }

  onTestSubmit(formData: any) {
      const testData = {
        ...formData,
        testId: formData.testId || 0, // 0 for new, actual ID for edit
        details: JSON.stringify(this.parameterList),
      };
      //console.log(testData);

      this.testService.submitTest(testData).subscribe({
        next: (res: ApiResponse<any>) => {
          //console.log('Success:', res);
          if (res.success) {
            this.notify.showSuccess(res.message);
            this.parameterList = [];
            this.router.navigate(['admin/test-list']);
          } else {
            this.notify.showError(res.message);
          }
        },
        error: (err) => {
          console.error('Submission Error:', err.error);
          this.notify.showError('An error occurred while submitting the test.');
        },
      });
  }
  onParamsListUpdate(updatedList: TestParameterModel[]) {
    this.parameterList = updatedList;
    console.log('Received list from child:', this.parameterList);
  }

onBack() {
    this.router.navigate(['admin/test-list']);
  }
}
