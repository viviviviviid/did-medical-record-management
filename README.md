# did-medical-record-management

### Domain
https://dmrs.space

### Notion Page
https://noble-walker-465.notion.site/DMRS-5933966e79ef4b88a899260b1de5a8bf?pvs=4
 
# Metadium DID SDK for Java

DID 생성 및 키 관리 기능과 [Verifiable Credential](https://www.w3.org/TR/vc-data-model/) 의 서명과 검증에 대한 기능을 Java 또는 Android 에 제공합니다. 

## 용어정리

- DID (탈중앙화 신원증명 : Decentralized Identity)
    - 개인의 데이터를 중앙화된 기관을 거치지 않으면서도 검증이 가능하게 하는 개념.
    - [W3C DID Spec](https://www.w3.org/TR/did-core/)

- Claim
    - 전체데이터의 각 단위 데이터 입니다.
    - 예를 들어 디지털 신원 정보에서 이름, 생년월일, 성별 등과 각각의 값을 페어로 claim 이라 불림.
    - [W3C VC Claims](https://www.w3.org/TR/vc-data-model/#claims)

- Verifiable Credential
    - 발급자, 유효기한, 검증에 사용되는 발급자의 공개키 등과  claim 의 집합과 서명을 포함하는 검증 가능한 Credential 입니다.
    - 위변조가 불가능하며 예로 휴대폰본인인증, 전자신분증 등 신원인증이 있습니다.
    - 발급자가 사용자의 정보를 인증하여 발급하고 사용자에게 전달됩니다.
    - [W3C VC Credential](https://www.w3.org/TR/vc-data-model/#credentials)
    
- Verifiable Presentation
    - 하나 이상의 Verifiable Credential 과 소유자의 공개키와 서명을 포함하는 검증 가능한 Presentation 입니다.
    - 소유자가 발급자에게서 발급 받은 credential 을 검증자에게 제출 시 사용됩니다.
    - [W3C VC Presentation](https://www.w3.org/TR/vc-data-model/#presentations)

## DID Workflow
![Workflow](images/DIDWorkflow.jpg)

1. 발급자(Issuer)와 사용자(Holder)는 Credential, Presentation 을 발급하기 위해 DID 를 미리 생성한다.
    - [DID 생성](#create-did)
2. 사용자는 발급자에게 Credential 발급 요청을 한다. 사용자가 발급하려는 Credential의 소유자라는 임을 확인하기 위해 DID 를 전달합니다.
    - 전달하는 DID에 대한 검증이 필요할 시 Credential 을 포함하지 않는 Presentation 을 전달
    -  [Presentation 발급](#issue-presentation)
3. 발급자는 사용자의 DID 를 확인하고
    - DID 가 presentation 으로 제출이 되면 presentation을 검증한다.
    - [Presentation 검증](#verify-credential-or-presentation)
4. 확인된 claim을 포함하는 Credential을 발급 합니다. 사용자에게 전달된 Credential은 안전한 저장공간에 저장합니다.
    - [Credential 발급](#issue-credential)
5. 사용자 검증자(Verifier)가 요구하는 Credential을 찾아 Presentation을 만들어 제출합니다.
    - [Presentation 발급](#issue-presentation)
6. 검증자는 Presentation 이 사용자가 보낸 것인지 검증하고 요구하는 발급자의 Credential 인지 검증을 합니다.
    - [Credential, Presentation 검증](#verify-credential-or-presentation)

[전체 테스트 코드](src/test/java/com/metadium/did/WorkflowTest.java)
