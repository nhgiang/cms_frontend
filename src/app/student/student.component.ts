import { Component, OnInit } from '@angular/core';
import { TableService } from '@shared/services/table.service';

interface DataItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: string;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {

  selectedCategory: string;
  selectedStatus: string;
  searchInput: any;
  displayData = [];

  orderColumn = [
    {
      title: 'ID',
      compare: (a: DataItem, b: DataItem) => a.id - b.id,
    },
    {
      title: 'Người dùng',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name)
    },
    {
      title: 'Công việc',
      compare: (a: DataItem, b: DataItem) => a.category.localeCompare(b.category)
    },
    {
      title: 'Phone',
      compare: (a: DataItem, b: DataItem) => a.price - b.price,
    },
    {
      title: 'Đối tác',
      compare: (a: DataItem, b: DataItem) => a.quantity - b.quantity,
    },
    {
      title: 'Trạng thái',
      compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name)
    }
  ];

  productsList = [
    {
      id: 31,
      name: 'Gray Sofa',
      avatar: 'assets/images/others/thumb-9.jpg',
      category: 'Home Decoration',
      price: 912,
      quantity: 23,
      status: 'in stock',
      checked: false
    },
    {
      id: 32,
      name: 'Beat Headphone',
      avatar: 'assets/images/others/thumb-10.jpg',
      category: 'Eletronic',
      price: 137,
      quantity: 56,
      status: 'in stock',
      checked: false
    },
    {
      id: 33,
      name: 'Wooden Rhino',
      avatar: 'assets/images/others/thumb-11.jpg',
      category: 'Home Decoration',
      price: 912,
      quantity: 12,
      status: 'in stock',
      checked: false
    },
    {
      id: 34,
      name: 'Red Chair',
      avatar: 'assets/images/others/thumb-12.jpg',
      category: 'Home Decoration',
      price: 128,
      quantity: 0,
      status: 'out of stock',
      checked: false
    },
    {
      id: 35,
      name: 'Wristband',
      avatar: 'assets/images/others/thumb-13.jpg',
      category: 'Eletronic',
      price: 776,
      quantity: 0,
      status: 'out of stock',
      checked: false
    },
    {
      id: 36,
      name: 'Charging Cable',
      avatar: 'assets/images/others/thumb-14.jpg',
      category: 'Eletronic',
      price: 119,
      quantity: 37,
      status: 'in stock',
      checked: false
    },
    {
      id: 37,
      name: 'Three Legs',
      avatar: 'assets/images/others/thumb-15.jpg',
      category: 'Home Decoration',
      price: 199,
      quantity: 17,
      status: 'in stock',
      checked: false
    },
  ];

  constructor(private tableSvc: TableService) {
    this.displayData = this.productsList;
  }

  search(): void {
    const data = this.productsList;
    this.displayData = this.tableSvc.search(this.searchInput, data);
  }

  categoryChange(value: string): void {
    const data = this.productsList;
    value !== 'All' ? this.displayData = data.filter(elm => elm.category === value) : this.displayData = data;
  }

  statusChange(value: string): void {
    const data = this.productsList;
    value !== 'All' ? this.displayData = data.filter(elm => elm.status === value) : this.displayData = data;
  }

}
