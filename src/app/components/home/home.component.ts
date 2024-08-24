import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

interface Frequency {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent {
  form!: FormGroup; 

  ngOnInit() {
    this.form = new FormGroup({
      amount: new FormControl('', Validators.required),
      date: new FormControl(new Date()),
      reccuring: new FormControl(false)
    });
  }

  get amount() { return this.form.get('amount') };
  get date() { return this.form.get('date') };
  get reccuring() { return this.form.get('reccuring') };

  frequencies: Frequency[] = [
    {value: 'steak-0', viewValue: 'Day'},
    {value: 'pizza-1', viewValue: 'Week'},
    {value: 'tacos-2', viewValue: 'Month'},
    {value: 'tacos-2', viewValue: 'Year'},
  ];
}
