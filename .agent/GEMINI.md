## 주요 디렉토리

- **`prompts/`**
  - 모든 지침의 진입점입니다.

- **`doc/`**
  - 지식 기반 (아키텍처, 명명 규칙, 워크플로우).

- **`packages/`**
  - 실제 업체 납품 또는 실 사용으로 쓸 애플리케이션을 개발할 위치입니다.

---

## 에이전트 업무 지침

- 당신의 주요 목표는 현재 프로젝트의 컨텍스트와 이 문서에 설명된 특정 지침을 기반으로 코드 생성, 파일 조작, 프로젝트 관리와 같은 작업을 실행하여 사용자를 지원하는 것입니다.
- 다음의 핵심 아키텍처 설계 문서를 참조하여 시스템의 구조와 설계 원칙을 완벽히 숙지한 후 작업을 수행합니다.
  - `/doc/guide/architecture/PLOZEN_System_Architecture_Spec_v0.0.2.md`
- 코딩 시 주석을 반드시 추가해야 합니다. 주석은 단순히 코드의 동작을 설명하는 것을 넘어, 해당 로직의 설계 의도(Why)와 복잡한 구현 방식(How)을 상세히 기술해야 합니다. 특히 함수와 클래스 단위에서는 JSDoc 스타일을 사용하여 인터페이스 명세를 명확히 하고, 유지보수 시 참고할 수 있는 핵심 정보를 포함합니다.

---

## 작업 수행 원칙 (Task Execution Principles)

- **선 분석, 후 실행, 사용자 확인 필수 (Analyze First, Execute After User Confirmation)**
  - 사용자가 분석을 요청하면, 분석 결과만 제공하고 실행 계획에 대한 명시적인 동의를 얻은 후에만 다음 작업을 진행합니다.
  - 절대 분석과 실행을 동시에 진행하지 않습니다.

---

## TypeScript 타입 안전성 지침 (TypeScript Type Safety Guidelines)

- **Strict `any` 금지**: 타입 에러를 해결하기 위해 `any`를 절대 사용하지 마십시오. `any`는 TypeScript의 안전성을 무력화합니다.
- **구체적인 타입 사용**: 항상 데이터 구조에 맞는 Interface나 Type을 정의하여 사용하십시오.
- **Unknown 데이터 처리**: 외부 소스(예: Supabase JSON)나 동적인 데이터를 다룰 때는 `unknown`을 먼저 사용하고, 적절한 검증이나 구조 정의 후 구체적인 타입이나 `Json`으로 형변환(Assertion)하십시오.
- **Database 타입 활용**: Supabase 스키마와 일치하도록 자동 생성된 `database.types.ts`를 적극 활용하십시오.
- **엄격한 데이터 매핑 (Supabase Mapping)**:
  - Form State(`string | string[]`)와 DB Column(`string` or `Json`) 간 타입 불일치를 해결하기 위해, 반드시 데이터 전송 전 명시적 변환(Conversion)을 수행하십시오.
  - `string[]` 타입의 데이터를 `string` 컬럼에 저장할 때는 `.join(', ')` 등을 사용하여 단일 문자열로 변환하고 `null` 처리를 확실히 하십시오.
  - `Json` 컬럼에 데이터를 저장할 때는 `database.types.ts`의 `Json` 타입을 import하여 명시적으로 캐스팅(`as Json`)하고, 내부 필드에 `undefined`가 포함되지 않도록 `omit` 하거나 `null`로 변환하십시오.
  - `payload` 변수 선언 시 `Database['public']['Tables'][테이블명]['Insert']` 타입을 명시하여, 컴파일 단계에서 타입 불일치를 즉시 확인하십시오.

---
