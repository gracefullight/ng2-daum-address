import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('addrDetail') inputAddrDetail: ElementRef;
  formData: string;

  addrForm: FormGroup = this.builder.group({
    zip: ['', [Validators.required]],
    addr: ['', [Validators.required]],
    addrDetail: [''],
    addrEng: ['', [Validators.required]],
  });

  constructor(private builder: FormBuilder) {}

  daumAddressOptions = {
    class: ['btn', 'btn-primary'],
  };

  setDaumAddressApi(data: any) {
    this.addrForm.patchValue({
      zip: data.zip,
      addr: data.addr,
      addrEng: data.addrEng,
    });
    this.inputAddrDetail.nativeElement.focus();
  }

  submitForm() {
    this.formData = JSON.stringify(this.addrForm.value, null, '\t');
  }
}
