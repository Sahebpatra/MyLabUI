import { FormControl, FormGroup, Validators } from '@angular/forms';

export class PatientModel {
  id?: number | null;
  firstName: string;
  lastName: string | null;
  age: number | string | null;
  ageType: string;
  genderId: number | string | null;
  genderText: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  referringPhysician: string | null;
  phlebotomist: string | null;
  barcode: string | null;
  collectionDate:  string | null ;
  collectionTime: string | null;
  weight: number | null;
  height: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(init?: Partial<PatientModel>) {
    this.id = init?.id ?? 0;
    this.firstName = init?.firstName ?? '';
    this.lastName = init?.lastName ?? null;
    this.age = init?.age ?? '';
    this.ageType = init?.ageType ?? 'Years';
    this.genderId = init?.genderId ?? null;
    this.genderText = init?.genderText ?? '';
    this.address = init?.address ?? null;
    this.phone = init?.phone ?? null;
    this.email = init?.email ?? null;
    this.referringPhysician = init?.referringPhysician ?? '';
    this.phlebotomist = init?.phlebotomist ?? '';
    this.barcode = init?.barcode ?? null;
    this.collectionDate = init?.collectionDate ?? null;
    this.collectionTime = init?.collectionTime ?? null;
    this.weight = init?.weight ?? 0;
    this.height = init?.height ?? 0;
    this.isActive = init?.isActive ?? true;
    this.createdAt = init?.createdAt ?? new Date().toISOString();
    this.updatedAt = init?.updatedAt ?? new Date().toISOString();
  }
  static asFormGroup(model: PatientModel = new PatientModel()): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(model.firstName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl(model.lastName),
      age: new FormControl(model.age, [Validators.required, Validators.min(0)]),
      ageType: new FormControl(model.ageType, Validators.required),
      genderId: new FormControl(model.genderId, Validators.required),
      email: new FormControl(model.email, Validators.email),
      phone: new FormControl(model.phone, [Validators.pattern('^[0-9]{10}$')]),
      address: new FormControl(model.address),
      referringPhysician: new FormControl(model.referringPhysician),
      phlebotomist: new FormControl(model.phlebotomist),
      barcode: new FormControl(model.barcode),
      collectionDate: new FormControl(model.collectionDate),
      collectionTime: new FormControl(model.collectionTime),
      weight: new FormControl(model.weight),
      height: new FormControl(model.height),
    });
  }
}
