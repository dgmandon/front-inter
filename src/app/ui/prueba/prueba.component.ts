import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { NgbCarouselModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import {
  AngularEditorConfig,
  AngularEditorModule,
} from "@kolkov/angular-editor";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ContenService } from "@core/services/content-service.interface";
import {
  CreateContent,
  Contents,
  Style,
  Details,
} from "@core/models/contents/create-content.model";
import { NotificationService } from "../shared/services/notification.service";
import { ContentRepository } from "@infrastructure/repositories/content.repository";
import { HttpService } from "@infrastructure/http/http.service";
import { SelectFormat } from "../shared/components/ftx-select/models/selectFormat.model";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

export interface tab {
  name: string;
}

export interface DragDropListItem {
  id: string;
  title: string;
  description: string;
  editing: boolean;
}

export interface Idioma {
  id: number;
  name: string;
  sufijo: string;
}

@Component({
  selector: "app-prueba",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbCarouselModule,
    AngularEditorModule,
    HttpClientModule,
    CdkDropList,
    CdkDrag,
  ],
  providers: [
    HttpService,
    { provide: ContenService, useClass: ContentRepository },
  ],
  templateUrl: "./prueba.component.html",
  styleUrl: "./prueba.component.css",
})
export class PruebaComponent implements OnInit, OnDestroy {

  btnAddDisable:boolean=false;
  private mySubscription: Subscription = new Subscription();
  //@Input() datosEntrada: any;
  datosEntrada: any;
  companyForm: FormGroup; // Definir el FormGroup
  previsualizar: boolean = false;
  sesionDetalle: boolean = false;
  sesionProductoBuscas: boolean = false;
  sesionDetalleIndividual: boolean = false;
  sesionDetallePersonalizado: boolean = false;
  htmlContentSesion = "";
  htmlContentDescripcion = "";
  htmlContentSesionControls: FormControl[] = [];
  loading: boolean = false;

  tabs: Idioma[] = [
    { id: 1, name: "Español", sufijo: "es" },
    { id: 2, name: "Ingles", sufijo: "en" },
  ];

  selected = new FormControl(0);
  @ViewChild("editar") editarModal!: ElementRef;
  @ViewChild("modalAcordeon") modalAcordeon!: ElementRef;

  tipoIdioma: SelectFormat[] = [
    { value: "es", name: "Español" },
    { value: "ja", name: "Japones" },
    { value: "en", name: "Ingles" },
  ];

  formulario: FormGroup;
  formTabs: FormArray<FormGroup> = new FormArray<FormGroup>([]);

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private contenService: ContenService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {



    /*this.datosEntrada = {
      "data": [
        {
          "id": "1",
          "tag": "Camisa cuello blanco",
          "logo": "https://www.hollywoodreporter.com/wp-content/uploads/2012/12/img_logo_blue.jpg?w=2000&h=1126&crop=1",
          "languages": [
            "es",
            "en",
            "ja"
          ],
          "styles": {
            "background-color": "white",
            "color": "black"
          },
          "contents": [
            {
              "languageIndex": 0,
              "title": "<strong> Último vestuario facilitado :</strong> 04/10/2023 <strong> Prendas de trabajo proporcionadas este año:</strong> 2",
              "details": [
                {
                  "index": 0,
                  "behavior": "WYSIWYG",
                  "label": "Material",
                  "data": "<strong> Tela de algodon :</strong> 04/10/2023 <strong> "
                }
              ]
            },
            {
              "languageIndex": 1,
              "title": "<strong> Last provided workwear :</strong> 04/10/2023 <strong> Workwears provided this year:</strong> 2",
              "details": [
                {
                  "index": 0,
                  "behavior": "WYSIWYG",
                  "label": "Material",
                  "data": "<strong> Cotton fabric :</strong> 04/10/2023 <strong> "
                }
              ]
            },
            {
              "languageIndex": 2,
              "title": "<strong> Last provided workwear :</strong> 04/10/2023 <strong> Workwears provided this year:</strong> 2",
              "details": [
                {
                  "index": 0,
                  "behavior": "WYSIWYG",
                  "label": "Material",
                  "data": "<strong> Cotton fabric :</strong> 04/10/2023  japan<strong> "
                }
              ]
            }
          ]

        }
      ],
      "currentPage": 0,
      "totalPages": 0,
      "totalCount": 0,
      "pageSize": 0,
      "hasPreviousPage": true,
      "hasNextPage": true
    };*/




    this.formulario = new FormGroup({
      tag: new FormControl(),
      logo: new FormControl(),
      carousel: new FormControl(),
      tabArray: this.formTabs,
    });



    //definir entrada de Idioma


    this.companyForm = this.formBuilder.group({
      idioma: [""],
      name: [""],
      acordeon: [],
      facebook: [],
    });

    this.urlPaginaWeb = this.sanitizer.bypassSecurityTrustResourceUrl(
      "http://qr-code-finotex.s3-website.us-east-2.amazonaws.com/store/1"
    );
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      if (params['mensaje']) {
        // console.log(params);
        this.datosEntrada = JSON.parse(params['mensaje']);
       // console.log(this.datosEntrada);
      }
    });





    if (this.datosEntrada) {
      this.loading = true;
      //tag
      //console.log(this.datosEntrada['tag']);
      this.formulario.get('tag')?.patchValue(this.datosEntrada['tag']);

     // console.log(this.datosEntrada['logo'] === null ? null : this.datosEntrada['logo']);

      const logoURL = this.datosEntrada['logo'] === null ? null : this.datosEntrada['logo'];
//console.log(logoURL);
      const imgCarrousel: any[] = this.datosEntrada['carousel'] === null ? null : this.datosEntrada['carousel'];

      // Logo
      if (logoURL !== null) {
        fetch(logoURL)
          .then(response => response.blob())
          .then(blob => {
            // Construye un objeto File a partir del Blob
            const file = new File([blob], 'nombre_archivo.jpg', { type: 'image/jpeg' });
            // Simula el evento y pasa al manejador original
            const event = { target: { files: [file] } };
            this.onFileSelected(event, 0);
          });
      }

      //imgCarrousel
      if (imgCarrousel !== null) {
        const files: File[] = [];
        await Promise.all(imgCarrousel.map(async (imgUrl, index) => {
          const response = await fetch(imgUrl);
          const blob = await response.blob();
          const file = new File([blob], `img_${index}`, { type: 'image/jpeg' });
          files.push(file);
        }));
        // Simula el evento y pasa al manejador original
        const event = { target: { files: files }, preventDefault: () => { } };
        //console.log(event);
        this.fileBrowseHandler(event);
      }

      //creacion de pestañas
      //await Promise.all(imgCarrousel.map(async (imgUrl, index) => {
      const languages: string[] = this.datosEntrada['languages'] === null ? null : this.datosEntrada['languages']; //this.datosEntrada['languages'];
      if (languages !== null) {
        await Promise.all(languages.map(async (language) => {
          const resultadoFiltro = this.tipoIdioma.filter(
            (idioma) => idioma.value === language
          );
          //console.log(resultadoFiltro);
          this.companyForm.get('idioma')?.patchValue(language);
          this.crear();
        }));
      }

      //Contenido
      const contents: any[] = this.datosEntrada['contents'];
      const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
      contents.forEach((element, index) => {
        //console.log(element);
        //Descripcion del Articulo
        const tab = formArray.at(index).get('descripcion');
        //console.log(contents[index]['title']);
        //console.log(formArray.at(index).get('descripcion'));
        tab?.patchValue(contents[index]['title']);

        //sesiones
        const details: any[] = element.details;

        details.forEach((detail: any) => {
          const label = detail.label;
          const data = detail.data;

          const sesion = new FormGroup({
            label: new FormControl(label),
            content: new FormControl(data),
            editing: new FormControl(false),
          });

          const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
          const tab = formArray.at(index) as FormGroup;
          const sesionesArray = tab.get("sesiones") as FormArray<FormGroup>;
          sesionesArray.push(sesion);
        });
      });
      this.loading = false;
    } else {
      this.crearPestanaForm({ id: 1, name: "Español", sufijo: "es" });
    }
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  public acordeons: DragDropListItem[] = [];

  public mostrarImagen: boolean = true;
  urlPaginaWeb: SafeResourceUrl;

  addTab() {
    this.modalService.open(this.editarModal, {
      ariaLabelledBy: "modal-basic-title",
    });
  }

  addAcordeon() {
    this.modalService.open(this.modalAcordeon, {
      ariaLabelledBy: "modal-basic-title",
    });
  }

  crear() {
    this.modalService.dismissAll(this.editarModal);
    const resultadoFiltro = this.tipoIdioma.filter(
      (idioma) => idioma.value === this.companyForm.get("idioma")?.value
    );
    //console.log(this.companyForm.get("idioma")?.value);
    let index = this.tabs.length + 1;
    let idioma: Idioma = {
      id: index,
      name: resultadoFiltro[0].name,
      sufijo: resultadoFiltro[0].value,
    };
    this.tabs.push(idioma);
    this.selected.setValue(this.tabs.length - 1);
    this.crearPestanaForm(idioma);
  }

  crearPestanaForm(idioma: Idioma) {
    // Crear los FormGroup para cada pestaña
    const formGroup = new FormGroup({
      nameTab: new FormControl(idioma.name),
      sufijo: new FormControl(idioma.sufijo),
      descripcion: new FormControl(),
      sesiones: new FormArray<FormGroup>([]),
    });
    this.formTabs.push(formGroup);
  }

  getControlSesiones(
    indexTab: number,
    indexAcordeon: number,
    controlName: string
  ) {
    const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const tab = formArray.at(indexTab) as FormGroup;
    const sesionesArray = tab.get("sesiones") as FormArray<FormGroup>;
    const sesion = sesionesArray.at(indexAcordeon) as FormGroup;
    return sesion.get(controlName) as FormControl;
  }

  // Función para obtener el FormArray 'sesiones' dado un índice
  getArraySesiones(index: number): any[] {
    const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const tab = formArray.at(index) as FormGroup;
    const sesionesArray = tab.get("sesiones") as FormArray<FormGroup>;
    // console.log(sesionesArray.controls);
    return sesionesArray.controls; // O podrías devolver sesionesArray.controls si necesitas controles del FormArray
  }

  // Función para obtener el FormArray 'sesiones' dado un índice
  getArraySesionesValue(index: number): any[] {
    const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const tab = formArray.at(index) as FormGroup;
    const sesionesArray = tab.get("sesiones") as FormArray<FormGroup>;
    return sesionesArray.value; // O podrías devolver sesionesArray.controls si necesitas controles del FormArray
  }

  getFormGroup(index: number) {
    return this.formTabs.at(index) as FormGroup;
  }

  crearAcordeon(index: number) {
   
    this.btnAddDisable = true;
    // Encontrar el mayor valor de id
    const maxId = this.acordeons.reduce((max, item) => {
      const itemId = parseInt(item.id);
      return itemId > max ? itemId : max;
    }, -Infinity);

    // Asignar el valor máximo o 0 si la lista está vacía
    let resultado = this.acordeons.length > 0 ? maxId : 0;
    resultado = resultado + 1;
    this.acordeons.push({
      description: this.companyForm.get("acordeon")?.value,
      title: "",
      id: resultado.toString(),
      editing: true,
    });
    //this.companyForm.get("acordeon")?.patchValue("");

    const sesion = new FormGroup({
      label: new FormControl(""),
      content: new FormControl(""),
      editing: new FormControl(true),
    });


    const formulario = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const segundoFormGroup = formulario.at(index) as FormGroup; // Obtiene el segundo FormGroup

    // Verifica si existe el FormGroup y su propiedad 'sesiones'
    if (segundoFormGroup && segundoFormGroup.get("sesiones")) {
      const sesionesFormArray = segundoFormGroup.get(
        "sesiones"
      ) as FormArray<FormGroup>;
      // Agrega la sesión al FormArray 'sesiones' del segundo FormGroup
      sesionesFormArray.push(sesion);
    }
    this.cdr.detectChanges();
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selected.setValue(index);
  }

  imgLogo: string | ArrayBuffer | null = null;

  onFileSelected(event: any, index: number) {
    const file: File = event.target.files[0];
    this.formulario.get('logo')?.patchValue(file);
    this.renderImage(file, index);
  }


  renderImage(file: File, index: number) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgLogo = e.target.result;
      this.validarFormulario();
    };
    reader.readAsDataURL(file);
  }

  images: string[] = [];

  onFileSelected1(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  removeImage(index: number) {
    //console.log(index);
    this.images.splice(index, 1);
  }

  onToggleChange(event: any) {
    this.previsualizar = event.checked;
    //console.log("Slide toggle checked:", this.previsualizar);
  }

  deleteHandler(index: number, i: number) {
    const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const tab = formArray.at(index) as FormGroup;
    const sesionesArray = tab.get("sesiones") as FormArray<FormGroup>;

    // Elimina el control en la posición 'i' del FormArray 'sesionesArray'
    sesionesArray.removeAt(i);
  }

  drop(event: CdkDragDrop<DragDropListItem[]>) {
    //console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  editing = false; // Variable para controlar si se está editando el título
  title = "Título inicial";
  // Método para activar la edición del título
  startEditing(task: AbstractControl) {
    task.patchValue({ editing: true });
  }

  // Método para finalizar la edición del título
  finishEditing(control: any) {
    this.btnAddDisable = false;
    //console.log(control.get("editing"));
    control.get("editing").patchValue(false);
    // const editing = this.getControlSesiones(index, i, 'editing');
    // editing.patchValue(false);
  }

  //imagenes
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
    this.validarFormulario();
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    //console.log(event.target.files);
    this.mostrarImagen = false;
    const files: any = event.target.files;
    //console.log(files);
    for (const item of files) {
      this.renderImageCarousel(item);
    }
    this.mostrarImagen = true;
    this.prepareFilesList(files);
  }

  fileBrowseHandlerFile(files: File[]) {
    this.mostrarImagen = false;
    //console.log(files);
    for (const item of files) {
      this.renderImageCarousel(item);
    }
    this.mostrarImagen = true;
    this.prepareFilesList(files);
  }



  imgCarrousel: File[] = [];

  renderImageCarousel(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgCarrousel.push(e.target.result);
    };
    //console.log(this.imgCarrousel);
    reader.readAsDataURL(file);
    this.validarFormulario();
  }

  dropFoto(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.imgCarrousel, event.previousIndex, event.currentIndex);
    //console.log(this.imgCarrousel);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      //console.log(this.files);
    }
    //this.uploadFilesSimulator(0);
    this.validarFormulario();
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  formHeader: boolean = false;
  formCarrousel: boolean = false;
  formContenido: boolean = false;
  formSesiones: boolean = false;

  validarFormulario() {
    //console.log(this.imgLogo);
    if (this.imgLogo !== null) {
      //console.log("1");
      this.formHeader = true;
    } else {
      this.formHeader = false;
      // Puedes mostrar un mensaje de error aquí si lo deseas
    }

    //console.log(this.imgCarrousel);
    if (this.files.length > 0) {
      //console.log("2");
      this.formCarrousel = true;
    } else {
      this.formCarrousel = false;
      // Puedes mostrar un mensaje de error aquí si lo deseas
    }

    //console.log(this.htmlContentDescripcion);

    if (this.htmlContentDescripcion != "") {
      //console.log("3");
      this.formContenido = true;
    } else {
      this.formContenido = false;
      // Puedes mostrar un mensaje de error aquí si lo deseas
    }

    if (this.htmlContentSesionControls.length > 0) {
      //console.log("4");
      this.formSesiones = true;
    } else {
      this.formSesiones = false;
      // Puedes mostrar un mensaje de error aquí si lo deseas
    }
  }

  public mostrar: boolean = false;

  visualizar() {
    //this.mostrar  = !this.mostrar;
  }

  guardar(index: number) {
    this.loading = true;
    //console.log(this.imgCarrousel);
    const tag: string = this.formulario.get("tag")?.value;
    const logo: File = this.formulario.get("logo")?.value;
    const carousel: File[] = this.base64toFile();
    const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const titleContent: Style[] = [];

    const languages: string[] = [];
    formArray.value.forEach((element) => {
      //console.log(element);
      let obj: Style = new Style(element.sufijo, element.descripcion);
      titleContent.push(obj);
      languages.push(element.sufijo);
    });

    const styles = {
      "background-color": "white",
      color: "black",
    };

    const contents: Contents[] = this.retornoItem();
    const contetFormData: CreateContent = new CreateContent(
      tag,
      languages,
      styles,
      logo,
      carousel,
      contents
    );
    //console.log(contetFormData);

    if (!this.datosEntrada) {
      //Creacion
      this.mySubscription = this.contenService.createContent(contetFormData).subscribe(
        (result) => {
          this.loading = false;
          this.notificationService.showSuccess("Contenido creado con exito");
        },
        (error) => {

          const errorMesagge = error.error;
          //console.log(error);
          this.loading = false;
          this.notificationService.showError("El Contenido no pudo ser creado [ " + errorMesagge.message + " ]");
        },()=>{
          this.mySubscription.unsubscribe();
        }
      );

    } else {
      //Update
      this.mySubscription = this.contenService.putCreateContent(this.datosEntrada['id'], contetFormData).subscribe(
        (result) => {
          this.loading = false;
          this.notificationService.showSuccess("Contenido creado con exito");

        },
        () => {
          this.loading = false;
          this.notificationService.showError("El Contenido no pudo ser creado");
          this.mySubscription.unsubscribe();
        }
      );

    }

  }

  uploadImages(images: string[]): Promise<any> {
    const formData = new FormData();

    // Agrega cada imagen al FormData
    images.forEach((base64Image, index) => {
      formData.append(`image${index}`, this.base64toBlob(base64Image));
    });

    // Hacer la solicitud POST al servidor
    return this.http.post<any>("URL_DEL_ENDPOINT", formData).toPromise();
  }



  //converir base64 a File
  base64toFile(): File[] {
    const files: File[] = [];
    this.imgCarrousel.forEach((element, index) => {
      /*const contentType = this.getFileTypeFromBase64(element + "");
      console.log(contentType);
      const blob = new Blob([element], { type: 'image/' + contentType });
      files.push(new File([blob], 'img' + index + "." + contentType, { type: 'image/' + contentType }));*/

      const dataString = element+"";
      const contentType = this.getFileTypeFromBase64(element + "")
      //console.log(dataString);
      const arr:any[] = dataString.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
         u8arr[n] = bstr.charCodeAt(n);
       }
       files.push(new File([u8arr], 'img' + index + "." + contentType, { type: 'image/' + contentType }));
    });
   // console.log(files);
    return files;
  }



  getFileTypeFromBase64(base64: string): string {
    const matches = base64.match(/^data:(.*?);/);
    if (matches && matches.length > 1) {
      return matches[1].split('/')[1];
    } else {
      // Si no se encuentra un tipo, se devuelve un valor predeterminado (puedes ajustarlo según tus necesidades)
      return 'unknown';
    }
  }



  // Función para convertir una cadena base64 en un objeto Blob
  base64toBlob(base64Data: string): Blob {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/jpeg" }); // Cambia el tipo según tu imagen
  }

  retornoItem() {
    const contents: Contents[] = [];
    const formArray = this.formulario.get("tabArray") as FormArray<FormGroup>;
    const datas: any[] = formArray.value;
    let i = 0;


    datas.forEach((data: any, index) => {
      let behavior: string = "WYSIWYG";
      let details: Details[] = [];
      if (data["sesiones"]) {

        const sesionesArray: any[] = data["sesiones"];
        //console.log(sesionesArray);
        sesionesArray.forEach((sesion: any, indexSesion) => {
          /*const content: Contents = new Contents(
            data.sufijo,
            sesion.label,
            sesion.content
          );
          contents.push(content);*/
          details.push(new Details(indexSesion, behavior, sesion.label, sesion.content));
        });
        contents.push(new Contents(index, data['descripcion'], details));
      }
    });
    return contents;
  }

  @HostListener('keydown.space', ['$event'])
  handleSpaceKey(event: KeyboardEvent): void {
    if (event.target instanceof HTMLInputElement) {
      event.stopPropagation(); // Detener la propagación del evento de teclado solo si el objetivo es un input
    }
  }
    
}
