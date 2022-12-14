import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { FireUser, UserModel } from '@common-module/models/user.model';
import { FileModel, ProductFile } from '@products-module/models/file.model';
import { ProfileFacade } from '@profile-module/facades/profile.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  file: FileModel | undefined;
  user: FireUser | undefined;
  loading: boolean = false;
  imgProfile: string | undefined;
  imgProfileTemp: string = '';

  name: string | undefined

  private subs: Subscription = new Subscription()

  constructor(
    private profileFacade: ProfileFacade,
  ) {
  }

  ngOnInit(): void {
    this.subs = this.profileFacade.getUser().pipe(
      tap((user: any) => {
        this.user = { ...user };
        this.imgProfile = user.img
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  readFile(event: any): void | string {
    const eFile: File = event.target.files[0]

    if (!eFile) {
      return this.imgProfileTemp = '';
    }

    const reader = new FileReader();
    reader.readAsDataURL(eFile);

    reader.onloadend = () => {
      this.imgProfileTemp = reader.result as string;
    }

    this.file = new ProductFile(eFile);
  }

  uploadFile() {

    if (this.file) {
      const { file } = { ...this.file };
      const ext = file.name.split('.')[file.name.split('.').length - 1];
      const relativePath = `profile/profile.${ext}`;

      this.profileFacade.uploadProfileImage(file, relativePath)
        .then(res => {
          console.log('Upload blob or file!', res);
          this.updateProfileUrlImage(relativePath);
        })
        .catch(err => {
          console.log(err.message);

        })
    }
  }

  updateProfileUrlImage(relativePath: string) {
    this.profileFacade.getUrlProfileImage(`${relativePath}`)
      .then(res => {
        console.log(res);
        if (this.user) {
          this.imgProfile = res;
          const userData = {
            ...this.user,
            img: res
          }
          this.profileFacade.updateImageProfile(userData.uid, userData as UserModel)
        }
      })
      .catch(err => {
        console.log(err.message);

      })
  }

  getUrlFile() {
    if (this.file)
      this.profileFacade.getUrlProfileImage(`profile/${this.file.file.name}`)
        .then(res => {
          console.log(res);
          this.imgProfile = res
        })
        .catch(err => {
          console.log(err.message);

        })
  }

  deleteFile() {
    if (!this.file) return

    this.profileFacade.deleteProfileImage(`profile/${this.file.file.name}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

}
