import { Injectable, NgZone } from '@angular/core';
import { from, Observable } from 'rxjs';
import { 
    Auth, 
    getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    UserCredential } 
    from '@angular/fire/auth';

const provider = new GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/userinfo.email');
// provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

provider.setCustomParameters({
    prompt: "select_account"
  });
  

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor(private auth: Auth, public ngZone: NgZone) {}

    async register({ email, password } : any) {
        try {
            const user = await createUserWithEmailAndPassword(
                this.auth,
                email,
                password
            );
            return user;
        } catch (e) {
            return null;
        }
    }

    signInWithGmail(): Observable<UserCredential>  {
        return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
    }

    async login({ email, password } : any) {
        try {
            const user = await signInWithEmailAndPassword(
                this.auth,
                email,
                password
            )
            return user;
        } catch (e) {
            return null;
        }
    }

    async logout() {
        return await signOut(this.auth);
    }
}
