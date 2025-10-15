# OZ PDF eForm Sample

### Demo

Github Pages : https://forcs-oz.github.io/ozpdfeform/

### Scenario

1. OZ ReportViewer HTML5로 PDF 파일을 미리보기

    - PDF.js 사용함.

    - 뷰어실행옵션 `pdf_page_handler` 기능을 활용하여, PDF Page 별 텍스트 정보를 추출하고 `PostEndBindEventScript`로 넣을 보고서 스크립트를 PDF 보고서에 삽입함.

    - 삽입된 보고서 스크립트를 통해 사용자 임의의 입력 컴포넌트들이 동적으로 추가됨.

2. OZ ReportViewer HTML5에서 OZD 저장

    - 사용자 임의의 입력 컴포넌트들이 삽입된 PDF 보고서를 OZD로 저장함.

    - 다른 OZ ReportViewer (HTML5, EXE, ...)에서 열어도 동일하게 미리보기 됨.