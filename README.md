# ng2-daum-address

> 앵귤러2를 위한 다음 주소 검색 API

[![NPM Version][npm-image]][npm-url]
[![Downloads][npm-downloads-image]][npm-downloads-url]

## 설치

```bash
npm i --save ng2-daum-address
```

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

자세한 예제는 [여기서][example-page] 확인 가능합니다.

## License

[MIT](LICENSE.md)

[npm-image]: https://img.shields.io/npm/v/ng2-daum-address.svg
[npm-url]: https://npmjs.org/package/ng2-daum-address
[npm-downloads-image]: http://img.shields.io/npm/dm/ng2-daum-address.svg
[npm-downloads-url]: https://npmjs.org/package/ng2-daum-address
[example-page]: https://brendaniel.github.io/ng2-daum-address
