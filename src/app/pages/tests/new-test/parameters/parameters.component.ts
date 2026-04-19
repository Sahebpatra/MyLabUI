import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TestParameterModel } from '../../../../core/models/TestParameterModel';
import { NotificationService } from '../../../../core/services/common/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parameters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parameters.component.html',
  styleUrl: './parameters.component.css',
})
export class ParametersComponent implements OnInit {
  @Input() paramsList: TestParameterModel[] = [];
  @Output() paramsListChanged = new EventEmitter<TestParameterModel[]>();
  private notify: NotificationService = inject(NotificationService);
 private route = inject(ActivatedRoute);
 
  displayList: any[] = [];
  selectedRowId: number | null = null;
  paramForm!: FormGroup;
  isUpdateMode = false;
  isAddnNewParam = false;
  testId: number | null = null;

  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit() {
    this.initForms();
    this.testId = +(this.route.snapshot.paramMap.get('id') || 0);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['paramsList']) {
      this.refreshDisplayList();
    }
  }
  initForms() {
    this.paramForm = this.fb.group({
      RowId: [0],
      ParrentId: [0],
      FieldType: ["1", Validators.required],
      TestName: ['', Validators.required],
      TestMethod: [''],
      UnitFieldType: ["0"],
      Unit: [''],
      ResultRangeMin: [''],
      ResultRangeMax: [''],
      CriticalRange: [false],
      CriticalRangeMin: [''],
      CriticalRangeMax: [''],
      ResultOperator: [""],
    });
  }

  // Logic from filterData()
  refreshDisplayList() {
    this.displayList = this.paramsList

      .filter((t) => t.ParrentId === 0)
      .map((p) => ({
        ...p,
        Children: this.paramsList.filter((c) => c.ParrentId === p.RowId),
      }));
      console.log(this.displayList);
      
  }

  addRow() {
    if (this.paramForm.invalid) return;

    const formValues = this.paramForm.getRawValue();

    if (this.isUpdateMode) {
      const index = this.paramsList.findIndex(
        (x) => x.RowId === formValues.RowId,
      );
      if (index !== -1) {
        this.paramsList[index] = {
          ...this.paramsList[index],
          ...formValues,
          isExpanded: formValues.FieldType == 2,
        };
        this.notify.showSuccess('Parameter updated successfully');
      }
    } else {
      const newRow: TestParameterModel = {
        ...formValues,
        RowId: this.paramsList.length + 1,
        TestId: 0,
        TestDetailsID: 0,
        isExpanded: formValues.FieldType == 2,
      };
      this.paramsList.push(newRow);
      this.paramsListChanged.emit(this.paramsList);
      this.notify.showSuccess('Parameter added successfully');
    }

    this.refreshDisplayList();
    this.toggleChild(this.displayList)
    this.resetForms();
    this.paramForm.get('FieldType')?.enable();
    // console.log(this.paramsList);
    // console.log(this.displayList);
  }
  onFieldTypeChange(event: any) {
    const selectedType = event.target.value;
    this.paramForm.get('FieldType')?.setValue(selectedType);
  }

  editRow(item: TestParameterModel) {
    this.isUpdateMode = true;
    this.selectedRowId = item.RowId;
    this.isAddnNewParam = true;
    this.paramForm.patchValue(item);
    this.paramForm.get('FieldType')?.disable();
  }
  addChildParam(item: TestParameterModel) {
    this.isAddnNewParam = true;
    item.isExpanded = true;
    this.paramForm.reset({ RowId: 0, ParrentId: item.RowId, FieldType: 1 });
    this.paramForm.get('FieldType')?.disable();
  }
  resetForms() {
    this.isUpdateMode = false;
    this.selectedRowId = null;
    this.isAddnNewParam = false;
    this.paramForm.get('FieldType')?.enable();
    this.paramForm.reset({ RowId: 0, ParrentId: 0, FieldType: 1 });
  }

  deleteRow(rowId: number) {
    this.paramsList = this.paramsList.filter(
      (x) => x.RowId !== rowId && x.ParrentId !== rowId,
    );
    this.paramsListChanged.emit(this.paramsList);
    this.refreshDisplayList();
    this.notify.showSuccess('Parameter deleted successfully');
  }

  toggleChild(parent: any) {
    parent.isExpanded = !parent.isExpanded;
  }
}
