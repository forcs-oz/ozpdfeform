# OZ PDF eForm Sample

### Demo

Github Pages : https://forcs-oz.github.io/ozpdfeform/

### Scenario

1. OZ ReportViewer HTML5を用いてPDFファイルをプレビュー
<br>OZ ReportViewer HTML5로 PDF 파일을 미리보기
    
    - PDF.jsライブラリ使用する。
    <br>PDF.js 사용함.

    - 実行オプション機能の`pdf_page_handler`を活用し、PDFページごとにテキスト情報を抽出、`PostEndBindEventScript`としてのレポートスクリプトをPDFレポートに挿入する。
    <br>뷰어실행옵션 기능 `pdf_page_handler`을 활용하여, PDF Page 별 텍스트 정보를 추출하고 `PostEndBindEventScript`로 넣을 보고서 스크립트를 PDF 보고서에 삽입함.

    - 挿入されたレポートスクリプトが実行されることによって、カスタマイズの入力コンポーネントらが動的に追加される。
    <br>삽입된 보고서 스크립트를 통해 사용자 임의의 입력 컴포넌트들이 동적으로 추가됨.

2. OZ ReportViewer HTML5からOZDファイルを保存
<br>OZ ReportViewer HTML5에서 OZD파일 저장

    - カスタマイズの入力コンポーネントらが追加されたPDFレポートをOZDファイルとして保存する。
    <br>사용자 임의의 입력 컴포넌트들이 삽입된 PDF 보고서를 OZD파일로 저장함.

    - OZDファイルを他のOZ ReportViewer (HTML5, EXE, ...)を用いて開けると、保存時と同じくプレビューされる。
    <br>OZD파일을 다른 OZ ReportViewer (HTML5, EXE, ...)에서 열어도 동일하게 미리보기 됨.