import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';
import { TagsComponent } from './tags/tags.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  @ViewChild('image') image!: ElementRef;
  @ViewChild(TagsComponent) tagsComp!: TagsComponent;

  postForm!: FormGroup;

  imageValid: boolean = false;

  constructor(private fb: FormBuilder, private uploadSvc: UploadService,
    private router: Router) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: this.fb.control<string>('', [ Validators.required, Validators.minLength(5) ]),
      description: this.fb.control<string>('', [ Validators.required, Validators.minLength(5) ])
      // tags: this.fb.control<string>('')
    })
  }

  imageSelected() {
    this.imageValid = true;
  }


  post() {
    // console.log("invalid >> " + this.postForm.invalid);
    // console.log("child value >> " + this.tagsComp.tags);
    // console.log("title value >> " + this.postForm.value.title);
    // console.log("description value >> " + this.postForm.value.description);

    // check whether form is valid
    // form fields
    // if(this.postForm.invalid) {
    //   let msg: string = "";
    //   if (this.postForm.get('title')?.hasError('required')) {
    //     msg += "Title is required. \n"
    //   } else if (this.postForm.get('title')?.invalid) {
    //     msg += "Title must be at least 5 characters. \n"
    //   }
    //   if (this.postForm.get('description')?.hasError('required')) {
    //     msg += "Description is required. \n"
    //   } else if (this.postForm.get('description')?.invalid) {
    //     msg += "Description must be at least 5 characters. \n"
    //   }

    //   alert(msg);
    //   return;
    // }


    // set form value
    const form = new FormData();
    form.set("title", this.postForm.value.title);
    form.set("description", this.postForm.value.description);

    const tagString: string = this.tagsComp.tags.join(" ");
    form.set("tags", tagString);

    // send form
    const file = this.image.nativeElement.files[0] as File
    form.set("file", file);
    this.uploadSvc.upload(form).then(result => {
      alert(JSON.stringify(result));

      this.uploadSvc.doNotLoad = false;
      this.router.navigate(['/']);
    })
  }
}
