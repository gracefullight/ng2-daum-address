import {
    Component,
    Input,
    ElementRef,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    EventEmitter
} from '@angular/core';

declare var daum: any;
const url = "https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false";

@Component({
  selector: 'btn-daum-address',
  template: `<button
              type="button"
              class="{{styleClass}}"
              (click)="openDaumApi()"
              >우편번호 찾기</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaumAddressComponent implements OnInit{
  @Output() result = new EventEmitter<Object>();
  @Input() options: any;

  private el: ElementRef;
  private styleClass: String;
  private debug: false;
  constructor(el: ElementRef) {
    this.el = el;
  }

  ngOnInit(){
    this.debug = this.options && this.options.debug ? this.options.debug : false;
    this.styleClass = this.options && this.options.class ? Array.isArray(this.options.class) ? this.options.class.join(" ") : this.options.class : '';
    this.loadDaumApi().then(()=>{
      if(this.debug){
        console.log('daum api loaded');
      }
    });
  }

  private openDaumApi(){
    let self = this;
    daum.postcode.load(() => {
      new daum.Postcode({
          oncomplete: function(data){
              if(self.debug){
                console.log(data);
              }

              let fullAddr = '', extraAddr = '', engAddr = '', zipCode = '';
              if (data.userSelectedType === 'R') {
                fullAddr = data.roadAddress;
                zipCode = data.zonecode;
                engAddr = data.roadAddressEnglish;
                if(data.bname !== ''){
                  extraAddr += data.bname;
                }
                if(data.buildingName !== ''){
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
              } else {
                fullAddr = data.jibunAddress;
                zipCode = data.postcode;
                engAddr = data.jibunAddressEnglish;
              }

              self.result.emit({
                zip: zipCode,
                addr: fullAddr,
                addrEng: engAddr
              });
          }
      }).open();
    });
  }

  private loadDaumApi(){
    return new Promise((resolve, reject)=> {
      let script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.async = true;
      this.el.nativeElement.appendChild(script);
      resolve(true);
    });
  }
}