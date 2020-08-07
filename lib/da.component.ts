import {
  Component,
  Input,
  ElementRef,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

declare let daum: any;
interface optionParams {
  type?: string;
  target?: string;
  width?: number;
  height?: number;
  border?: number;
  class?: string[] | string;
  debug?: boolean;
}

interface addressResults {
  zip: string;
  addr: string;
  addrEng: string;
}

const url =
  'https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false';

@Component({
  selector: 'btn-daum-address',
  template: `<button
    type="button"
    class="{{ styleClass }}"
    (click)="openDaumApi()"
  >
    우편번호 찾기
  </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaumAddressComponent implements OnInit {
  @Output() result = new EventEmitter<addressResults>();
  @Input() options: optionParams;

  public styleClass: string;
  private el: ElementRef;
  private debug: boolean;

  constructor(el: ElementRef) {
    this.el = el;
  }

  ngOnInit(): void {
    this.debug =
      this.options && this.options.debug ? this.options.debug : false;
    this.styleClass =
      this.options && this.options.class
        ? Array.isArray(this.options.class)
          ? this.options.class.join(' ')
          : this.options.class
        : '';
    this.loadDaumApi().then(() => {
      this.print('Daum api has been loaded.');
    });
  }

  private print(msg: string) {
    if (this.debug) {
      console.log(`[${Math.floor(new Date().getTime() / 1000)}]`, msg);
    }
  }

  private daumApiCallback(data): void {
    this.print(data);
    let fullAddr = '',
      extraAddr = '',
      engAddr = '',
      zipCode = '';
    if (data.userSelectedType === 'R') {
      fullAddr = data.roadAddress;
      zipCode = data.zonecode;
      engAddr = data.roadAddressEnglish;
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr +=
          extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ' (' + extraAddr + ')' : '';
    } else {
      fullAddr = data.jibunAddress;
      zipCode = data.postcode;
      engAddr = data.jibunAddressEnglish;
    }

    this.result.emit({
      zip: zipCode,
      addr: fullAddr,
      addrEng: engAddr,
    });
  }

  openDaumApi() {
    // eslint-disable-next-line
    const self = this;
    if (!this.options || !this.options.type || this.options.type === 'popup') {
      daum.postcode.load(() => {
        new daum.Postcode({
          oncomplete: (data) => self.daumApiCallback(data),
        }).open();
      });
    } else {
      if (!this.options.target) {
        this.print('ERROR: Parent Component does not have a target element.');
        return false;
      }

      const $target = this.el.nativeElement.parentElement.querySelector(
        `#${this.options.target}`
      );
      this.print($target);
      switch (this.options.type) {
        case 'layer':
          const width = this.options.width || 300;
          const height = this.options.height || 460;
          const border = this.options.border || 5;
          daum.postcode.load(() => {
            new daum.Postcode({
              oncomplete: (data) => self.daumApiCallback(data),
              onclose: () => ($target.style.display = 'none'),
              width: '100%',
              height: '100%',
            }).embed($target);
          });
          $target.style.display = 'block';
          $target.style.width = `${width}px`;
          $target.style.height = `${height}px`;
          $target.style.border = `${border}px solid`;
          $target.style.left = `${
            ((window.innerWidth || document.documentElement.clientWidth) -
              width) /
              2 -
            border
          }px`;
          $target.style.top = `${
            ((window.innerHeight || document.documentElement.clientHeight) -
              height) /
              2 -
            border
          }px`;
          try {
            $target.querySelector('#btnCloseLayer').onclick = () => {
              $target.style.display = 'none';
            };
          } catch (e) {
            this.print(`ERROR: ${e.message}`);
          }
          break;
        case 'inline':
          const currentScroll = Math.max(
            document.body.scrollTop,
            document.documentElement.scrollTop
          );
          daum.postcode.load(() => {
            new daum.Postcode({
              oncomplete: (data) => {
                self.daumApiCallback(data);
                document.body.scrollTop = currentScroll;
              },
              onclose: () => ($target.style.display = 'none'),
              onresize: (size) => ($target.style.height = size.height + 'px'),
              width: '100%',
              height: '100%',
            }).embed($target);
          });
          $target.style.display = 'block';
          try {
            $target.querySelector('#btnFoldWrap').onclick = () => {
              $target.style.display = 'none';
            };
          } catch (e) {
            this.print(`ERROR: ${e.message}`);
          }
          break;
      }
    }
  }

  private loadDaumApi() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.async = true;
      this.el.nativeElement.appendChild(script);
      resolve(true);
    });
  }
}
