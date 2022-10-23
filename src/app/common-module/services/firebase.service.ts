import { Injectable } from '@angular/core';
import { getApp } from "firebase/app";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, UploadResult } from "firebase/storage";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private firebaseApp = getApp();
  private fbStorage = getStorage(this.firebaseApp, `gs://${environment.firebaseConfig.storageBucket}`)

  /**
   * This function allow upload a file to app storage.
   * 
   * @param file File object that will be loaded in the storage.
   * @param pathFile Relative path where the file will be saved.
   * @returns A promise that resolve an object with result of the operation.
   */
  addFile(file: File, pathFile: string): Promise<UploadResult> {
    const imgProfileRef = ref(this.fbStorage, pathFile);
    return uploadBytes(imgProfileRef, file)
  }

  /**
   * This function allow delete a file in the storage.
   * 
   * @param pathFile Relative path of the file that will be delete.
   * @returns A promise that resolve a void or error of the operation.
   */
  deleteFile(pathFile: string): Promise<void> {
    const imgProfileRef = ref(this.fbStorage, pathFile);
    return deleteObject(imgProfileRef)
  }

  /**
   * This function allow get the full url of the file in the relative path.
   * 
   * @param pathFile relative path of the file
   * @returns Pomise that resolve a string with the full path of the file
   */
  downloadFile(pathFile: string): Promise<string> {
    const imgProfileRef = ref(this.fbStorage, pathFile);
    return getDownloadURL(imgProfileRef)
  }
}
