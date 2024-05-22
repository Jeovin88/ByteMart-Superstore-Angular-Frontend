import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public itemService: ItemService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      itemName: new FormControl('', [Validators.required]),
      itemDesc: new FormControl('', Validators.required),
      categoryId: new FormControl('', [Validators.required]),
      quantity: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required])

    });
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.itemService.create(this.form.value).subscribe((res:any) => {
         console.log('Item created successfully!');
         this.router.navigateByUrl('item/index');
    })
  }

}
