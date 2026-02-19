import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { Layout } from './layout';
import { ButtonModule } from 'primeng/button';
import { NewWash } from './wash/new-wash/new-wash';
import { CardModule } from 'primeng/card';
import { StepperModule } from 'primeng/stepper';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FluidModule } from 'primeng/fluid';
import { MapSearch } from './map-search/map-search';
import { InputTextModule } from 'primeng/inputtext';
import { InputOtpModule } from 'primeng/inputotp';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { TabsModule } from 'primeng/tabs';
import { Login } from '../auth/login/login';
import { Register } from '../auth/register/register';

@NgModule({
  declarations: [Layout, NewWash],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    CardModule,
    StepperModule,
    CheckboxModule,
    ReactiveFormsModule,
    InputNumberModule,
    FormsModule,
    JsonPipe,
    SelectButtonModule,
    SliderModule,
    RadioButtonModule,
    FluidModule,
    InputTextModule,
    InputOtpModule,
    DatePickerModule,
    DialogModule,
    DrawerModule,
    TabsModule,
    Login,
    Register
  ],
  exports: [Layout, NewWash],
})
export class LayoutModule {}
