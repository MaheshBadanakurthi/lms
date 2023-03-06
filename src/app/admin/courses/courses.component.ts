import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { AddNewCourseObj, ApiObjData,GetCourseData } from 'src/app/models/courses';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CoursesComponent implements OnInit {
  data!: string | null;

  addFormGrorup!: FormGroup;
  editFormGroup!: FormGroup;

  courseFileData!: number;
  assignFileData!: number;
  updateAssignFileData!: number;
  updateFileData!: number;


  courseData: any;
  editData!: ApiObjData;

  addDialogDisplay: boolean = false;
  editDialogDisplay: boolean = false;

  courseBody!: AddNewCourseObj;
  editCourseBody!:any;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.addFormValidation();
    this.editFormValidation();
  }

  public addFormValidation(): void {
    this.addFormGrorup = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      courseFile: new FormControl('', Validators.nullValidator),
      assignFile: new FormControl('', Validators.nullValidator),
    });
  }

  public editFormValidation(): void {
    this.editFormGroup = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      courseFile: new FormControl('', Validators.nullValidator),
      assignFile: new FormControl('', Validators.nullValidator),
    });
  }

  public onFileSelect(event: any): void {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addFormGrorup.get('courseFile')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.addFormGrorup.get('courseFile')?.value);

      this.apiService.uploadFile(formData).subscribe((res) => {
        try {
          console.log(res[0].id);
          this.courseFileData = res[0].id;
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went to wrong !!',
          });
        }
      });
    }
  }

  public onAssignFileSelect(event: any): void {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addFormGrorup.get('assignFile')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.addFormGrorup.get('assignFile')?.value);

      this.apiService.uploadFile(formData).subscribe((res) => {
        try {
          console.log(res[0].id);
          this.assignFileData = res[0].id;
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went to wrong',
          });
        }
      });
    }
  }

  public onUpdateFileSelect(event: any): void {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editFormGroup.get('courseFile')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.editFormGroup.get('courseFile')?.value);
      this.apiService.uploadFile(formData).subscribe((res) => {
        try {
          console.log(res[0].id);
          this.updateFileData = res[0].id;
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went to wrong',
          });
        }
      });
    }
  }

  public onUpdateAssignFileSelect(event: any): void {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editFormGroup.get('assignFile')?.setValue(file);
      const formData = new FormData();
      formData.append('files', this.editFormGroup.get('assignFile')?.value);
      this.apiService.uploadFile(formData).subscribe((res) => {
        try {
          console.log(res[0].id);
          this.updateAssignFileData = res[0].id;
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went to wrong',
          });
        }
      });
    }
  }

  // Get courses
  public getCourses(): void {
    this.isLoading = true;
    this.apiService.getCourses().subscribe((res) => {
      try {
        console.log(res);
        this.courseData = res.data;
        console.log(res.data);

        this.isLoading = false;
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong !!',
        });
      }
    });
  }

  public addDialog(): void {
    this.addDialogDisplay = true;
  }

  public closeAddDialog(): void {
    this.addDialogDisplay = false;
  }

  public onSubmit(): void {
    console.log(this.addFormGrorup.value);
    const assignFile = this.assignFileData;
    const courseFile = this.courseFileData;

          this.courseBody = {
        data: {
          assignment: assignFile,
          courseContent: courseFile,
          courseDescription:this.addFormGrorup.value.description,
          title: this.addFormGrorup.value.title,
        },
      };

    // this.courseBody.data.assignment = assignFile;
    // this.courseBody.data.courseContent = courseFile;
    // this.courseBody.data.courseDescription = this.addFormGrorup.value.description;
    // this.courseBody.data.title = this.addFormGrorup.value.title;

    this.apiService.postCourse(this.courseBody).subscribe((res) => {
      console.log(res);
      try {
        console.log("mahesh is looking for this",this.courseBody);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Course Added successfully !',
        });
        this.getCourses();
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went to wrong !!',
        });
      }
      this.addDialogDisplay = false;
    });
  }

  public editDialog(data: ApiObjData): void {
    console.log('confirmation', data);

    this.editData = data;
    this.editFormGroup = this.fb.group({
      title: new FormControl(data.attributes.title, [Validators.required]),
      description: new FormControl(data.attributes.courseDescription, [
        Validators.required,
      ]),
      courseFile: new FormControl('', Validators.nullValidator),
      assignFile: new FormControl('', Validators.nullValidator),
    });
    this.editDialogDisplay = true;
  }

  public closeEditDialog(): void {
    this.editDialogDisplay = false;
  }

  public onUpdate(): void {

    // console.log('update assign data', this.updateAssignFileData);
    // console.log('file data', this.updateFileData);

    if (this.updateFileData == undefined) {

      // this.editCourseBody.data.assignment =  this.updateAssignFileData,
      // this.editCourseBody.data.courseContent =this.editData.attributes.courseContent.data.id,
      // this.editCourseBody.data.courseDescription =  this.editFormGroup.value.description,
      // this.editCourseBody.data.title = this.editFormGroup.value.title

      this.editCourseBody = {
        data: {
          assignment: this.updateAssignFileData,
          courseContent: this.editData.attributes.courseContent.data.id,
          courseDescription:this.editFormGroup.value.description,
          title: this.editFormGroup.value.title,
        },
      };
    } else if (this.updateAssignFileData == undefined) {

      // this.editCourseBody.data.assignment = this.editData.attributes.assignment.data.id,
      // this.editCourseBody.data.courseContent = this.updateFileData
      // this.editCourseBody.data.courseDescription =  this.editFormGroup.value.description
      // this.editCourseBody.data.title = this.editFormGroup.value.title

      this.editCourseBody = {
        data: {
          assignment: this.editData.attributes.assignment.data.id,
          courseContent: this.updateFileData,
          courseDescription: this.editFormGroup.value.description,
          title: this.editFormGroup.value.title,
        },
      };
    } else if (

      this.updateFileData == undefined &&
      this.updateAssignFileData == undefined
    ) {

      // this.editCourseBody.data.assignment = this.editData.attributes.assignment.data.id,
      // this.editCourseBody.data.courseContent = this.editData.attributes.courseContent.data.id,
      // this.editCourseBody.data.courseDescription = this.editFormGroup.value.description,
      // this.editCourseBody.data.title = this.editFormGroup.value.title

      this.editCourseBody = {
        data: {
          assignment: this.editData.attributes.assignment.data.id,
          courseContent: this.editData.attributes.courseContent.data.id,
          courseDescription: this.editFormGroup.value.description,
          title: this.editFormGroup.value.title,
        },
      };
    } else {

      this.editCourseBody = {
        data: {
          assignment: this.updateAssignFileData,
          courseContent: this.updateFileData,
          courseDescription: this.editFormGroup.value.description,
          title: this.editFormGroup.value.title,
        },
      };

      // this.editCourseBody.data.assignment = this.updateAssignFileData;
      // this.editCourseBody.data.courseContent = this.updateFileData;
      // this.editCourseBody.data.courseDescription = this.editFormGroup.value.description;
      // this.editCourseBody.data.title =  this.editFormGroup.value.title

    }
    this.apiService
      .updateCourse(this.editData.id, this.editCourseBody)
      .subscribe((res) => {
        try {
          console.log("am searching below");

          console.log(this.editData.id, this.editCourseBody);

          console.log('updted course', res);
          this.getCourses();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Course updated successfully !',
          });
          // location.reload();
          // console.log("NO errors while updating the course");

        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went to wrong !!',
          });
        }
        // console.log(" there is a error while updating the course");

      });
  }

  public deleteCourse(data: ApiObjData): void {
    console.log("deleting course obj",data);

    this.confirmationService.confirm({
      message: `Do you want to delete - ${data.attributes.title} ?`,
      header: 'Delete confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.apiService.deleteCourse(data.id).subscribe((res) => {
          try {
            this.getCourses();
            this.messageService.add({
              severity: 'error',
              summary: 'Delete',
              detail: 'Deleted successfully !',
            });
          } catch (error) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong !!',
            });
          }
        });
      },
      reject: () => {},
    });
  }
}
