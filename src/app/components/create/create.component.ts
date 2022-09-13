import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

import { CreateService } from 'src/app/services/create.service';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/state';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public createForm!: FormGroup;
  public isUserLogged: boolean = false;
  public isLoggedIn = this.store.select(UserState.isLoggedIn);

  constructor(
    private store: Store,
    private createService: CreateService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.isLoggedIn.subscribe( value => {
      this.isUserLogged = value;
    });
  }

  ngOnInit(): void {
    if (!this.isUserLogged) {
      this.router.navigate(['/']);
    }

    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      image: new FormControl('', [Validators.required, Validators.minLength(10)]),
      category: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      tags: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.createForm.invalid) {
      return;
    }

    let pet :any = this.createForm.value;

    this.createService.createPet(pet).subscribe({
      next: () => {
        this.createForm.reset();
        this.snackBar.open('Pet created!', '👍🏻');
      },
      error: (e) => {
        console.error(e);
        this.snackBar.open('Something is wrong, try again later!', '😢');
      }
    });
  }
}