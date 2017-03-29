# ng2-daum-address

> 앵귤러2를 위한 다음 주소 검색 API

[![NPM Version][npm-image]][npm-url]
[![Downloads][npm-downloads-image]][npm-downloads-url]

## 설치

```bash
npm i --save ng2-daum-address
```
**1.1.1버전 이상을 사용하기를 권합니다. 그 이하버전은 ng build시에 module을 가져오지 못하는 버그가 있습니다.**

**1.1.3버전 이상은 앵귤러2의 4버전을 이용하셔야합니다.**

## 사용법

`NgDaumAddressModule`를 `app.module.ts`에 임포트:
```ts
import { NgDaumAddressModule } from 'ng2-daum-address';

@NgModule({
  ...
  imports: [
    ...
    NgDaumAddressModule,
  ],
})
export class AppModule { }
```

템플릿에서 `btn-daum-address` 컴포넌트를 아래처럼 추가:
```html
<btn-daum-address (result)="setDaumAddressApi($event)" [options]="daumAddressOptions"></btn-daum-address>
```

가져온 컴포넌트`.ts` 에서 설정:
```ts
daumAddressOptions =  {
  class: ['btn', 'btn-primary']
};

setDaumAddressApi(data){
  // 여기로 주소값이 반환
  console.log(data);
}
```


> popup형태가 아닐 경우 아래의 Element를 ParentComponent에 넣어야합니다.

### layer
```html
<!-- iOS에서는 position:fixed 버그가 있음, 적용하는 사이트에 맞게 position:absolute 등을 이용하여 top,left값 조정 필요 -->
<div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:1;-webkit-overflow-scrolling:touch;">
<img src="//t1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" alt="닫기 버튼">
</div>
```

### inline
```html
<div id="wrap" style="display:none;border:1px solid;width:500px;height:300px;margin:5px 0;position:relative">
<img src="//t1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" alt="접기 버튼">
</div>
```

## 옵션
* type?: String => layer|inline|popup (default popup)
* target?: String => layer, inline 타입시 embed할 요소의 ID값 (위 소스에서 layer, wrap)
* width?: Number => layer 타입시 가로크기
* height?: Number => layer 타입시 세로크기
* border?: Number => layer 타입시 테두리 크기
* class?: Array|String => 클래스 부여
* debug?: boolean => 디버깅 모드


자세한 예제는 [여기서][example-page] 확인 가능합니다.

## License

[MIT](https://github.com/brendaniel/ng2-daum-address/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/ng2-daum-address.svg
[npm-url]: https://npmjs.org/package/ng2-daum-address
[npm-downloads-image]: http://img.shields.io/npm/dm/ng2-daum-address.svg
[npm-downloads-url]: https://npmjs.org/package/ng2-daum-address
[example-page]: https://ng2-daum-address.firebaseapp.com/