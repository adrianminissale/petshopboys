import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CreateService } from './create.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm = this.formBuilder.group({
    name: '',
    category: '',
    status: '',
    image: '',
    tags: []
  });

  constructor(
    private createService: CreateService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {}

  onSubmit(): void {
    let pet :any = this.createForm.value;

    this.createService.createPet(pet).subscribe((data :any)=>{
      console.log(data);
    });
  }
}