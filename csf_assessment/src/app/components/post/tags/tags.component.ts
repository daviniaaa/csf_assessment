import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  tagsForm!: FormGroup;
  tags: string[] = [];

  ngOnInit(): void {
    this.tagsForm = this.fb.group({
      tags: this.fb.control<string>('')
    })
  }

  addTag() {
    const input: string = this.tagsForm.value.tags;
    const stringArray: string[] = input.split(/(\s+)/);
    for (let s of stringArray) {
      if ((this.tags.find(x => x == s)) == undefined)
        this.tags.push(s);
    }
  }

  deleteTag(tag: string) {
    this.tags = [...this.tags.filter(x => x != tag)];
  }
}
