import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
    emailForm: FormGroup | any;

    emailParameter : any = '';
    password = '';
    error = '';
    username = '';
    
//   image: number;

    constructor(
        private auth: Auth,
        private router: Router,
        private route: ActivatedRoute,
        private toastController: ToastController,
        public loadingController: LoadingController,
        public alertController: AlertController,
        private fb: FormBuilder
    ) {}

    get email() {
		return this.emailForm.get('email');
	}

    ngOnInit() {        
        this.emailForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
		});

        const emailParameter: any = this.route.snapshot.queryParamMap.get('email');
        if (emailParameter != null && emailParameter != undefined) {
            this.emailParameter = emailParameter;
            
        }
    }

    async openLoader() {
        const loading = await this.loadingController.create({
        message: 'Please Wait ...',
        duration: 2000
        });
        await loading.present();
    }
    async closeLoading() {
        return await this.loadingController.dismiss();
    }

    recoverPassword() {
        sendPasswordResetEmail(this.auth, this.emailParameter)
        .then(data => {
            console.log(data);
            this.presentToast('Email de redefinição de senha enviado',  'bottom', 3000); // this is toastController
            this.router.navigateByUrl('/login');
        })
        .catch(err => {
            console.log(JSON.stringify(err));
            console.log(` Falha ${err}`);
            this.error = err.message;
            console.log(JSON.stringify(this.error));
        });
    }

    async presentToast(message : string, position : any, duration : any) {
        const toast = await this.toastController.create({
                message,
                duration,
                position
        });
        toast.present();
    }

    navigateToLogin() {
        this.router.navigateByUrl('/login', { replaceUrl: true });
    }

}
