import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
// 1. Importar RouterLink
import { Router, RouterLink } from '@angular/router';
import { AlertController, NavController, IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  // 2. Añadir RouterLink al array de imports
  imports: [CommonModule, ReactiveFormsModule, IonicModule, RouterLink],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;

  validation_messages = {
    email: [
      { type: 'required', message: 'Escribir correo' },
      { type: 'pattern', message: 'No es un formato de correo' },
    ],
    password: [{ type: 'required', message: 'Escriba su password' }],
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    public alertController: AlertController,
    public navCtrl: NavController,
    public formBuilder: FormBuilder
  ) {
    this.formLogin = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
        ])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {}

  async iniciar() {
    if (this.formLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor, ingrese un correo y contraseña válidos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    const credentials = this.formLogin.value;

    this.authService.login(credentials).subscribe(
      async (res) => {
        if (res.login) {
          this.navCtrl.navigateRoot('/folder/inbox');
        }
      },
      async (err) => {
        const alert = await this.alertController.create({
          header: 'Error de inicio de sesión',
          message: err.error.message || 'Ocurrió un error al intentar iniciar sesión.',
          buttons: ['Aceptar'],
        });
        await alert.present();
      }
    );
  }
}