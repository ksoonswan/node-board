# Node Board 프로젝트
NestJS 기반 간단 게시판 API 서버.  
Docker를 사용해 MySQL을 로컬에 띄워 개발 DB를 구성.

---

## 개발 환경
- Node.js
- NestJS 
- TypeORM
- MySQL
- Docker, Docker Compose

---

## 프로젝트 설치 방법
### 1. 프로젝트 클론
```
git clone https://github.com/ksoonswan/node-board.git
cd node-board
```

### 2. 의존성 설치
```
npm install
```

---

## Docker 설치 및 MySQL 세팅
### 1. Docker 설치
https://docs.docker.com/get-started/get-docker/ 에서 Docker를 설치

### 2. MySQL 컨테이너 설치 및 실행
```
docker-compose up -d
```

### 2-1. MySQL 컨테이너 삭제
```
docker-compose down -v  
```

---

## 프로젝트 실행 방법
### 1. 임시 데이터 (Keyword, Alert) 삽입 및 스키마 생성
```
npm run scripts:keyword-alert-data
```
> synchronize: true 로 인해 디비스키마 자동생성.

### 2. NestJS 서버 실행
```
npm run start
```
> `http://localhost:3000` 에서 실행됩니다.

> 서버 실행시에는 synchronize: false

> Swagger API 문서 URL: `http://localhost:3000/docs`
