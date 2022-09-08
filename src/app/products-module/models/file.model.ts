export interface FileModel {
    file: File;
    nameFile:string;
    type: string;
    url:string;

    // constructor( archivo:File){
    //     this.archivo = archivo;
    //     this.nombreArchivo = archivo.name;
    //     this.tipo = archivo.type;
    //     this.url = archivo.webkitRelativePath
    // }
}

export class ProductFile implements FileModel {
    file: File;
    nameFile: string;
    type: string;
    url: string;

    constructor( file: File ){
        this.file = file;
        this.nameFile = file.name;
        this.type = file.type;
        this.url = file.webkitRelativePath;
    }

}