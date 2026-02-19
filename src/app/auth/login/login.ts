import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';


@Component({
  selector: 'app-login',
  imports: [FormsModule, InputTextModule, ButtonModule, FloatLabelModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone:true,
})
export class Login {
  email = '';
  password = '';


   login() {
    console.log(this.email, this.password);
  }
}
