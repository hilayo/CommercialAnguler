import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.pattern(/^[\d\s\-\+\(\)]+$/)]),
      subject: new FormControl('', [Validators.required, Validators.minLength(3)]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      alert('Thank you for contacting us! We will get back to you soon.');
      this.resetForm();
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm() {
    this.contactForm.reset();
    this.submitted = false;
  }

  // Helper methods to access form controls easily in template
  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  get subject() {
    return this.contactForm.get('subject');
  }

  get message() {
    return this.contactForm.get('message');
  }
}
