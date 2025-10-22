# OZ PDF eForm Sample

### Demo

Github Pages : https://forcs-oz.github.io/ozpdfeform/

### Scenario

1. MS Wordを用いて、書式を作成し、PDFファイルを保存
<br>MS Word을 사용하여 서식을 작성하고 PDF파일을 저장

2. OZ ReportViewer HTML5を用いて、PDFファイルをプレビュー
<br>OZ ReportViewer HTML5로 PDF 파일을 미리보기
    
    - PDF.jsライブラリ使用する。
    <br>PDF.js 사용함.

    - 実行オプション機能の`pdf_page_handler`を活用し、PDFページごとにテキスト情報を抽出、`PostEndBindEventScript`としてのレポートスクリプトをPDFレポートに挿入する。
    <br>뷰어실행옵션 기능 `pdf_page_handler`을 활용하여, PDF Page 별 텍스트 정보를 추출하고 `PostEndBindEventScript`로 넣을 보고서 스크립트를 PDF 보고서에 삽입함.

    - 挿入されたレポートスクリプトが実行されることによって、カスタマイズの入力コンポーネントらが動的に追加される。
    <br>삽입된 보고서 스크립트를 통해 사용자 임의의 입력 컴포넌트들이 동적으로 추가됨.

3. OZ ReportViewer HTML5から、OZDファイルを保存
<br>OZ ReportViewer HTML5에서 OZD파일 저장

    - カスタマイズの入力コンポーネントらが追加されたPDFレポートをOZDファイルとして保存する。
    <br>사용자 임의의 입력 컴포넌트들이 삽입된 PDF 보고서를 OZD파일로 저장함.

    - OZDファイルを他のOZ ReportViewer (HTML5, EXE, ...)を用いて開けると、保存時と同じくプレビューされる。
    <br>OZD파일을 다른 OZ ReportViewer (HTML5, EXE, ...)에서 열어도 동일하게 미리보기 됨.

### Requirements

- OZ ReportViewerは、2025年10月17日以降にパッケージングされた9.0バージョンを使用してください。
<br>OZ ReporetViewer는 2025년 10월 17일 이후 패키징된 9.0 버전을 사용하여야 합니다.

- PDF.jsは、3.11.174以前のlegacyバージョンを使用してください。
<br>PDF.js는 3.11.174 이하 legacy 버전을 사용하여야 합니다.


## User Guide


### 1. ターゲットオプション / 타겟 옵션

`PdfDocScriptGeneratorSample.js`に定義されたJavascriptのclassは、PDFページの情報を読み取り、レポートスクリプトを生成します。
<br>`PdfDocScriptGeneratorSample.js`에 정의된 Javascript class는 PDF 페이지 정보를 읽어 보고서 스크립트를 생성합니다.

`main.js`で、ターゲットオプションを設定することで、ターゲットテキストや、生成する入力コンポーネントの設定を調整することができます。
<br>`main.js`에서 타겟 옵션을 설정하여, 타겟 텍스트나 생성할 입력 컴포넌트 설정을 조정할 수 있습니다.


#### 例 / 예시

```js
// main.js
const sampleTargets = [
    {
        prefix: "@",
        id: "SIGN",
        compType: "SignPad",
        useTimestampLabel: true,
        fontFamily: "Yu Mincho",
        dateFormat: "yyyy年 MM月 dd日",
        roles: {
            "DR": {
                desc: "担当医署名",
            },
            "PA": {
                desc: "患者署名",
            },
            "AG": {
                desc: "代理人署名",
                color: "#AA0000"
            }
        }
    },
    ...
];
```

- PDFページから、`"@SIGN_DR", "@SIGN_PA", "@SIGN_AG"`のテキストを探し、その位置に入力コンポーネントを生成します。
<br>PDF 페이지에서 `"@SIGN_DR", "@SIGN_PA", "@SIGN_AG"` 텍스트를 찾고, 그 위치에 입력 컴포넌트를 생성합니다.

- 入力コンポーネントの`FormID`は、各々`"SIGN_DR", "SIGN_PA", "SIGN_AG"`になり、すべてのぺーじで同じ`FormID`を持つ入力コンポーネントらは値が同期されます。
<br>입력 컴포넌트의 `FormID`는 각각 `"SIGN_DR", "SIGN_PA", "SIGN_AG"`이 되며, 모든 페이지에서 같은 `FormID`를 갖는 입력 컴포넌트들은 값이 동기됩니다.

- `compType: "SignPad"`によって、入力コンポーネントのタイプは`SignPad`になります。
<br>`compType: "SignPad"`에 의해, 입력 컴포넌트의 타입은 `SignPad`가 됩니다.

- `fontFamily: "Yu Mincho"`によって、入力コンポーネントのフォント名は`Yu Mincho`になります。
<br>`fontFamily: "Yu Mincho"`에 의해, 입력 컴포넌트의 폰트명은 `Yu Mincho`가 됩니다.

- `roles`の`desc`によって、入力コンポーネントのツールチップテキストは、各々`"担当医署名", "患者署名", "代理人署名"`になります。
<br>`roles`의 `desc`에 의해, 입력 컴포넌트의 툴팁 텍스트는 각각 `"担当医署名", "患者署名", "代理人署名"`으로 됩니다.

- `roles`の`color`によって、入力コンポーネントのテキスト／フレームの色は、各々`黒／透明, 黒／透明, "#AA0000"`になります。
<br>`roles`의 `color`에 의해, 입력 컴포넌트의 텍스트/테두리 색은 각각 `검은색/투명, 검은색/투명, "#AA0000"`으로 됩니다.

- `useTimestampLabel: true`によって、PDFページから、`"@SIGNTIME_DR", "@SIGNTIME_PA", "@SIGNTIME_AG"`のテキストを探し、その位置に入力コンポーネントの入力時のタイムスタンプを表示するラベルコンポーネントを生成します。
<br>`useTimestampLabel: true`에 의해, PDF 페이지에서 `"@SIGNTIME_DR", "@SIGNTIME_PA", "@SIGNTIME_AG"` 텍스트를 찾고, 그 위치에 입력 컴포넌트의 입력시의 타임 스탬프를 표시하는 라벨 컴포넌트를 생성합니다.

- ラベルコンポーネントの`FormID`は、各々`"SIGNTIME_DR", "SIGNTIME_PA", "SIGNTIME_AG"`になり、すべてのぺーじで同じ`FormID`を持つラベルコンポーネントらは値が同期されます。
<br>라벨 컴포넌트의 `FormID`는 각각 `"SIGNTIME_DR", "SIGNTIME_PA", "SIGNTIME_AG"`이 되며, 모든 페이지에서 같은 `FormID`를 갖는 라벨 컴포넌트들은 값이 동기됩니다.

- `roles`の`color`によって、ラベルコンポーネントのテキストの色は、各々`黒, 黒, "#AA0000"`になります。
<br>`roles`의 `color`에 의해, 라벨 컴포넌트의 텍스트 색은 각각 `검은색, 검은색, "#AA0000"`으로 됩니다.

- `dateFormat: "yyyy年 MM月 dd日"`によって、ラベルコンポーネントの日付表示形式は`yyyy年 MM月 dd日`になります。
<br>`dateFormat: "yyyy年 MM月 dd日"`에 의해, 라벨 컴포넌트의 날짜표시형식은 `yyyy年 MM月 dd日`가 됩니다.


#### 詳細 / 상세

```ts
interface PdfTargetOption {
     prefix: string;
     id: string;
     compType: string;
     roles: { [postfix: string]: PdfTargetOptionRole }
     useTimestampLabel?: boolean;
     fontFamily?: string;
     dateFormat?: string;
}

interface PdfTargetOptionRole {
     desc?: string;
     color?: string;
}
```

- ターゲットテキストは`[prefix][id]_[postfix]`になり、その位置に生成される入力コンポーネントの`FormID`は`[id]_[postfix]`になります。
<br> 타겟 텍스트는 `[prefix][id]_[postfix]`이 되며, 그 위치에 생성될 입력 컴포넌트의 `FormID`는 `[id]_[postfix]`이 됩니다.

- `compType`に設定できる値は、OZ ReportViewerのレポートスクリプト関数`AddNewInputComponent`の最初の因子と同じで、`"SignPad", "TextBox", "DateTimePicker", "NumericUpDown"`などがあります。
<br> `compType`에 설정할 수 있는 값은, OZ ReportViewer의 보고서 스크립트 함수 `AddNewInputComponent`의 첫번째 인자와 동일하며, `"SignPad", "TextBox", "DateTimePicker", "NumericUpDown"` 등이 있습니다.

- `useTimestampLabel: true`が設定された場合, PDFページから`[prefix][id]TIME_[postfix]`テキストを探し、その位置に`FormID`が`[id]TIME_[postfix]`になるタイムスタンプ表示用のラベルコンポーネントを生成します。
<br> `useTimestampLabel: true`가 설정되면, PDF 페이지에서 `[prefix][id]TIME_[postfix]` 텍스트를 찾고, 그 위치에 `FormID`가 `[id]TIME_[postfix]`인 타임 스탬프 표시용 라벨 컴포넌트를 생성합니다.

- `roles`の`desc`に値がある場合、入力コンポーネントのツールチップテキストがその値になります。
<br>`roles`의 `desc`에 값이 있는 경우, 입력 컴포넌트의 툴팁 텍스트가 그 값으로 됩니다.

- `roles`の`color`に値がある場合、入力コンポーネントのテキストとフレームの色、そしてラベルコンポーネントのテキストの色がその値になります。
<br>`roles`의 `color`에 값이 있는 경우, 입력 컴포넌트의 텍스트와 테두리 색, 그리고 라벨 컴포넌트의 텍스트 색이 그 값으로 됩니다.

- `fontFamily`に値が設定された場合、入力コンポーネントとラベルコンポーネントのフォント名がその値になります。
<br>`fontFamily`에 값이 설정된 경우, 입력 컴포넌트와 라벨 컴포넌트의 폰트명이 그 값으로 됩니다.

- `dateFormat`に値が設定された場合、入力コンポーネントとラベルコンポーネントの日付表示形式がその値になります。デフォルトは`yyyy/MM/dd hh:mm:ss`です。
<br>`dateFormat`에 값이 설정된 경우, 입력 컴포넌트와 라벨 컴포넌트의 날짜표시형식이 그 값으로 됩니다. 디폴트는 `yyyy/MM/dd hh:mm:ss`입니다.


### 2. PDFファイルの作成 / PDF 파일 작성

入力されるPDFファイルは、MS Wordで作成されたことが想定されています。
<br>입력될 PDF 파일은 MS Word에서 작성될 것이 상정되었습니다.

具体的なコンテンツは、`example/testSample.docx`と`example/testSample.pdf`を参照ください。
<br>구체적인 콘텐츠는 `example/testSample.docx`와 `example/testSample.pdf`를 참조해주십시오.

書式をMS Wordで作成した後、ターゲットオプションとして設定したターゲットテキストを意図した位置に記入してください。
<br>서식을 MS Word로 작성 후, 타겟 옵션으로 설정한 타겟 텍스트를 의도한 위치에 기입하세요.

ターゲットテキストの探索は、以下の規則に従います。
<br>타겟 텍스트의 탐색은 아래의 규칙을 따릅니다.

- スペース(` `)と全角スペース(`　`)はすべて無視されます。
<br>공백문자(` `)와 전각 공백문자(`　`)은 모두 무시됩니다.

- 特殊記号の全角文字ら(`！`-`～`)は、半角文字(`!`-`~`)として扱われます。
<br>특수기호 전각 문자들(`！`-`～`)은 반각 문자(`!`-`~`)로써 취급합니다.

コンポーネントの領域は、以下の規則に従います。
<br>컴포넌트 영역은 아래의 규칙에 따라 결정됩니다.

- 基本的には、ターゲットテキストの表示領域が選ばれます。
<br>기본적으로는 타겟 텍스트의 표시 영역이 선택됩니다.

- ターゲットテキストの表示領域を含む四角形のフレームや背景色の領域があれば、最も狭い面積の領域が選ばれます。
<br>타겟 텍스트의 표시 영역을 포함하는 사각형 테두리나 배경색 영역이 있다면 가장 좁은 면적의 영역이 선택됩니다.
