import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  id!: number;
  item!: Item;
  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['itemNo'];
    this.itemService.find(this.id).subscribe((data: Item)=>{
      this.item = data;
    }); 
      
    this.form = new FormGroup({
      itemNo: new FormControl('', [Validators.required]),
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
    this.itemService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Item updated successfully!');
         this.router.navigateByUrl('item/index');
    })
  }

}
