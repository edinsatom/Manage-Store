import { Injectable } from '@angular/core';
import { FireUser, UserModel } from 'src/app/common-module/models/user.model';
import { AuthService } from 'src/app/common-module/services/auth.service';
import { FirestoreService } from 'src/app/common-module/services/firestore.service';


@Injectable({ providedIn: 'root' })
export class AuthFacade {
    constructor(
        private auth: AuthService,
        private firestore: FirestoreService<UserModel>
    ) { }

    createUser(userData: UserModel): Promise<FireUser> {

        return this.auth.createUser(userData)
            .then((resp) => {
                const { user } = resp;

                if (user) {
                    const uid = user.uid;

                    const fireUser = new FireUser(userData.userName, userData.email, uid);
                    return Promise.resolve({ ...fireUser })
                }
                return Promise.reject('No fue posible crear el usuario')
            })
    }

    saveUserData(userData: UserModel): Promise<any> {
        return this.firestore.addItemToDoc(`${userData.uid}/profile`, userData)
    }

}