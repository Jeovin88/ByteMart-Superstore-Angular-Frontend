import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  items: Item[] = [];
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public itemService: ItemService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.itemService.getAll().subscribe((data: Item[])=>{
      this.items = data;
      console.log(this.items);
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteItem(id?:string){
    this.itemService.delete(id).subscribe(res => {
         this.items = this.items.filter(item => item.itemNo !== id);
         console.log('Item deleted successfully!');
    })
  }

}
