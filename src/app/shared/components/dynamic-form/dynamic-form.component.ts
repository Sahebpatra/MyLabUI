import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonService } from '../../../core/services/common/common.service';
import { map, Observable, of } from 'rxjs';
import { DynamicFormConfig } from '../../models/dynamic-form.model';
import { CommonHttpService } from '../../../core/services/common/common-http.service';
import { NotificationService } from '../../../core/services/common/notification.service';
import { RichTextComponent } from '../rich-text/rich-text.component';
import { ApiResponse } from '../../models/api-response.model';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RichTextComponent,
    NgbDatepickerModule,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  @Input({ required: true }) config!: DynamicFormConfig;
  @Input() isEditMode: boolean = false;
  @Output() onSave = new EventEmitter<any>();
  @Output() onBack = new EventEmitter<void>();
  private _initialData: any;
  @Input() set initialData(data: any) {
    if (data && this.dynamicForm) {
      this.dynamicForm.patchValue( this.transformIncomingData(data) );
    }
    this._initialData = data;
  }
  private fb = inject(FormBuilder);
  private masterService = inject(CommonService);
  private commonHttp = inject(CommonHttpService);
  private notifyService = inject(NotificationService);
  dynamicForm!: FormGroup;
  lookupData: { [key: string]: Observable<any[]> } = {};

  ngOnInit() {
    this.createForm();
    if (this._initialData) {
      this.dynamicForm.patchValue(
        this.transformIncomingData(this._initialData),
      );
    }
  }
  private transformIncomingData(data: any) {
    const transformed = { ...data };

    this.config.controls.forEach((ctrl) => {
      const value = transformed[ctrl.name];
      if (!value) return;

      if (ctrl.type === 'date') {
        // Use your existing masterService helper
        if(typeof value === 'string') {
        transformed[ctrl.name] = this.masterService.toNgbDate(value);
        } else {
          transformed[ctrl.name] = value;
        }
      } else if (ctrl.type === 'time') {
        // Use your existing masterService helper
        if(typeof value === 'string') {
        transformed[ctrl.name] = this.masterService.toNgbTime(value);
        } else {
          transformed[ctrl.name] = value;
        }

      }
    });

    return transformed;
  }
  createForm() {
    const formControls: any = {};

    this.config.controls.forEach((ctrl) => {
      const validations = this.bindValidations(ctrl.validators || {});
      formControls[ctrl.name] = [ctrl.value || '', validations];
      // Initial data fetch
      this.loadControlOptions(ctrl);
    });

    this.dynamicForm = this.fb.group(formControls);
    //for cascading dropdowns, setup value change listeners after form is created
    this.setupCascadingLogic();
  }
  private loadControlOptions(ctrl: any, parentValue?: any) {
    const typesWithChoices = ['select', 'radio', 'checkbox'];
    if (!typesWithChoices.includes(ctrl.type)) return;

    if (ctrl.apiUrl) {
      const url = parentValue ? `${ctrl.apiUrl}${parentValue}` : ctrl.apiUrl;
      this.lookupData[ctrl.name] = this.commonHttp
        .get<ApiResponse<any[]>>(url)
        .pipe(map((response) => response.data ?? []));
    } else if (ctrl.asyncOptionsKey) {
      this.lookupData[ctrl.name] = this.masterService.getDropdownObservable(
        ctrl.asyncOptionsKey,
      );
    } else if (ctrl.options) {
      this.lookupData[ctrl.name] = of(ctrl.options);
    }
  }

  private setupCascadingLogic() {
    this.config.controls.forEach((ctrl) => {
      if (ctrl.dependsOn) {
        const parentControl = this.dynamicForm.get(ctrl.dependsOn);
        this.dynamicForm.get(ctrl.name)?.disable();
        parentControl?.valueChanges.subscribe((value) => {
          // Reset the child control value
          this.dynamicForm.get(ctrl.name)?.setValue('', { emitEvent: false });

          // Refresh the lookup data for the child based on parent value
          if (value) {
            this.dynamicForm.get(ctrl.name)?.enable();
            this.loadControlOptions(ctrl, value);
          } else {
            // If parent is cleared, clear child options
            this.lookupData[ctrl.name] = new Observable((obs) => obs.next([]));
          }
        });
      }
    });
  }
  private bindValidations(constraints: any) {
    const validatrosList = [];
    if (constraints.required) validatrosList.push(Validators.required);
    if (constraints.minLength)
      validatrosList.push(Validators.minLength(constraints.minLength));
    if (constraints.pattern)
      validatrosList.push(Validators.pattern(constraints.pattern));
    if (constraints.email) validatrosList.push(Validators.email);
    if (constraints.min !== undefined)
      validatrosList.push(Validators.min(constraints.min));
    return validatrosList;
  }

  // handleSubmit() {
  //   if (this.dynamicForm.valid) {
  //     const rawValue = this.dynamicForm.value;
  //     const sanitizedPayload: any = {};

  //     // 2. Sanitize: Convert empty strings to null for the API
  //     Object.keys(rawValue).forEach((key) => {
  //       const value = rawValue[key];
  //       sanitizedPayload[key] = value === '' ? null : value;
  //     });
  //     this.onSave.emit(sanitizedPayload);
  //   } else {
  //     this.config.controls.forEach((ctrl) => {
  //       if (this.dynamicForm.get(ctrl.name)?.invalid) {
  //         this.notifyControlError(ctrl);
  //       }
  //     });
  //     this.dynamicForm.markAllAsTouched();
  //   }
  // }
  handleSubmit() {
    if (this.dynamicForm.valid) {
      const rawValue = this.dynamicForm.value;
      const sanitizedPayload: any = {};
      Object.keys(rawValue).forEach((key) => {
        const value = rawValue[key];
        sanitizedPayload[key] = value === '' ? null : value;
      });
      this.onSave.emit(sanitizedPayload);
    } else {
      this.config.controls.forEach((ctrl) => {
        if (this.dynamicForm.get(ctrl.name)?.invalid) {
          this.notifyControlError(ctrl);
        }
      });
      this.dynamicForm.markAllAsTouched();
    }
  }
  handleReset() {
    if (this._initialData) {
      this.dynamicForm.patchValue(this._initialData);
    } else {
      const defaultValues: any = {};
      this.config.controls.forEach((ctrl) => {
        defaultValues[ctrl.name] = ctrl.value || '';
      });
      this.dynamicForm.patchValue(defaultValues);
    }
  }
  private notifyControlError(ctrlConfig: any) {
    const control = this.dynamicForm.get(ctrlConfig.name);
    if (!control || !control.errors) return;

    const errors = control.errors;
    const label = ctrlConfig.label;
    let message = '';

    if (errors['required']) {
      message = `${label} is required.`;
    } else if (errors['minlength']) {
      message = `${label} must be at least ${errors['minlength'].requiredLength} characters.`;
    } else if (errors['pattern']) {
      message = ctrlConfig.validationMsg || `Invalid format for ${label}`;
    } else if (errors['email']) {
      message = `Please enter a valid email address.`;
    } else if (errors['min']) {
      message = `${label} must be at least ${errors['min'].min}.`;
    } else {
      message = ctrlConfig.validationMsg || `${label} is invalid.`;
    }

    this.notifyService.showError(message);
  }
  getControl(name: string): FormControl {
    return this.dynamicForm.get(name) as FormControl;
  }
}
