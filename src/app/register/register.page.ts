import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class RegisterPage implements OnInit {
  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() { }

  async registrar() {
    if (this.formRegister.invalid) {
      return;
    }

    const userData = this.formRegister.value;
    this.authService.register(userData).subscribe(
      async (res) => {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Usuario registrado correctamente. Ahora puedes iniciar sesión.',
          buttons: ['OK']
        });
        await alert.present();
        this.navCtrl.navigateBack('/login');
      },
      async (err) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: err.error.message || 'No se pudo completar el registro.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }
}