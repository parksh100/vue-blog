<template>
  <div class="container">
    <div class="row">
      <h1 class="text-center fw-bold">블로그 자동화</h1>
      <p>
        <a
          href="https://docs.google.com/spreadsheets/d/1D_KLdVAQR67SOMqKjjX9n_hDaKdwtHeXfOssfKMbr60/edit?gid=0#gid=0"
          target="_blank"
          >키워드 목록 가기</a
        >
      </p>
    </div>
    <!-- 구글 시트에서 조회한 정보를 보여주는 테이블  -->
    <table class="table table-bordered" style="font-size: 13px">
      <thead>
        <tr class="text-center bg-light">
          <th>번호</th>
          <th>클러스터</th>
          <th>인텐트</th>
          <th>키워드</th>
          <th>주요 키워드</th>
          <th>톤</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="blog in blogs" :key="blog.row_number">
          <td>{{ blog.row_number }}</td>
          <td>{{ blog.Cluster }}</td>
          <td>{{ blog.Intent }}</td>
          <td>{{ blog.Keywords }}</td>
          <td>{{ blog.PrimaryKeyword }}</td>
          <td>{{ blog.Tone }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="getAction(blog)">생성하기</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row text-center" v-if="isCreating">
      <p class="progress-bar">
        <em>선택된 키워드 생성을 시작합니다<span class="dot-animate"></span></em>
      </p>
    </div>

    <!-- 받아온 HTML을 실제로 렌더링 -->
    <div v-html="htmlContent" class="mt-5 bg-light p-5 rounded"></div>
  </div>
</template>

<script>
import axios from "axios";
import { marked } from "marked";

export default {
  name: "SnsBlogView",
  data() {
    return {
      blogs: [],
      isCreating: false,
      htmlContent: "",
    };
  },
  created() {
    this.getBlogs();
  },
  methods: {
    async getBlogs() {
      try {
        const response = await fetch("https://n8n.ai.kr/webhook/get-keywords");
        const data = await response.json();
        console.log("n8n 응답:", data);
        this.blogs = data;
      } catch (error) {
        console.error("데이터를 가져오는 중 에러:", error);
      }
    },
    async getAction(blog) {
      this.isCreating = true;
      try {
        const response = await axios.post("https://n8n.ai.kr/webhook-test/create-content", blog);
        console.log("생성 요청 성공:", response.data);
        alert("생성 요청을 성공적으로 보냈습니다!");
        // 응답 콘솔에 출력
        console.log("응답 콘솔:", response.data);
        this.htmlContent = response.data[0].message.content;
        this.isCreating = false;
      } catch (error) {
        console.error("생성 요청 실패:", error);
        alert("생성 요청에 실패했습니다.");
        this.isCreating = false;
      }
    },
  },
};
</script>

<style>
* {
  font-family: "Noto Sans KR", sans-serif;
}
/* 진행 중 텍스트에 깜빡이는 애니메이션 추가 */
.progress-bar {
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
}

.dot-animate::after {
  content: "";
  display: inline-block;
  animation: dots 1.5s steps(3, end) infinite;
}

@keyframes dots {
  0%,
  20% {
    content: "";
  }
  40% {
    content: ".";
  }
  60% {
    content: "..";
  }
  80%,
  100% {
    content: "...";
  }
}

/* 보라색 미래 테마 기본 스타일 */
body.blog-body {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Noto Sans KR", sans-serif;
  color: #333;
}

/* 블로그 포스트 메인 제목 (h1) */
h1.blog-h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #4a148c;
  margin-top: 1.5em;
  margin-bottom: 0.8em;
  line-height: 1.2;
  border-bottom: 3px solid #7b1fa2;
  padding-bottom: 0.3em;
  font-family: "Noto Sans KR", sans-serif;
}

/* 목차 컨테이너 */
div.toc-container {
  background: linear-gradient(135deg, #f5f0ff, #f0e6ff);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 4px 10px rgba(106, 27, 154, 0.08);
  font-family: "Noto Sans KR", sans-serif;
  border-left: 4px solid #9c27b0;
}

/* 목차 제목 */
div.toc-container h3 {
  font-weight: 700;
  color: #4a148c;
  font-size: 18px;
  margin: 0 0 15px 0;
  padding: 0;
  line-height: 1.4;
}

/* 목차 목록 컨테이너 */
div.toc-list {
  display: flex;
  flex-direction: column;
  gap: 8px !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* 목차 링크 */
div.toc-list a.toc-link {
  color: #6a1b9a;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4 !important;
  padding: 4px 0;
  margin: 0 !important;
  transition: color 0.2s ease;
  display: block;
}

div.toc-list a.toc-link:hover {
  color: #9c27b0;
  text-decoration: none;
}

/* 워드프레스 특정 오버라이드 */
.wp-site-blocks div.toc-list,
.entry-content div.toc-list {
  gap: 8px !important;
  margin: 0 !important;
}

.wp-site-blocks div.toc-list a,
.entry-content div.toc-list a {
  line-height: 1.4 !important;
  margin: 0 !important;
  padding: 4px 0 !important;
}

/* 주요 섹션 제목 (h2) */
h2.blog-h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #4a148c;
  margin-top: 1.5em;
  margin-bottom: 0.8em;
  line-height: 1.2;
  border-left: 5px solid #9c27b0;
  padding-left: 0.8em;
  font-family: "Noto Sans KR", sans-serif;
}

/* 섹션 내 하위 주제 (h3 - 색상 반전) */
h3.blog-h3-inverse {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  background-color: #6a1b9a;
  padding: 0.5em 1em;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 1.5em;
  margin-bottom: 0.8em;
  line-height: 1.2;
  font-family: "Noto Sans KR", sans-serif;
}

/* 일반 소제목 (h4 - 이탤릭) */
h4.blog-h4-italic {
  font-size: 1.2rem;
  font-weight: 700;
  color: #8e24aa;
  margin-top: 1.5em;
  margin-bottom: 0.8em;
  line-height: 1.2;
  font-style: italic;
  font-family: "Noto Sans KR", sans-serif;
}

/* 일반 본문 텍스트 */
p.blog-paragraph {
  font-size: 1rem;
  line-height: 1.8;
  margin: 1.2em 0;
  color: #333;
  font-family: "Noto Sans KR", sans-serif;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* 강조가 필요한 본문 텍스트 */
p.blog-paragraph-highlight {
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 1.5em 0;
  color: #4a148c;
  font-weight: 500;
  background: linear-gradient(135deg, #f5f0ff, #f0e6ff);
  padding: 1.2em;
  border-radius: 8px;
  border-left: 4px solid #9c27b0;
  box-shadow: 0 2px 6px rgba(106, 27, 154, 0.08);
  font-family: "Noto Sans KR", sans-serif;
}

/* 인라인 강조 (strong) */
strong.blog-strong {
  font-weight: 700;
  color: #6a1b9a;
  font-family: "Noto Sans KR", sans-serif;
}

/* 굵은 텍스트 (b) */
b.blog-b {
  font-weight: 700;
  color: #8e24aa;
  font-family: "Noto Sans KR", sans-serif;
}

/* 체크리스트 컨테이너 */
ul.checklist {
  margin-bottom: 1.2em;
  padding-left: 0.5em;
  list-style-type: none;
  color: #333;
  font-family: "Noto Sans KR", sans-serif;
}

/* 체크리스트 항목 */
ul.checklist li {
  margin-bottom: 0.5em;
  position: relative;
  padding-left: 2em;
}

/* 체크리스트 input */
ul.checklist li input[type="checkbox"] {
  position: absolute;
  left: 0;
  top: 0.3em;
  accent-color: #9c27b0;
}

/* 체크리스트 label */
ul.checklist li label {
  cursor: pointer;
}

/* 인용구 */
blockquote.blockquote-styled {
  border-left: 4px solid #9c27b0;
  padding: 0.5em 1em;
  margin: 1.5em 0;
  font-style: italic;
  color: #6a1b9a;
  background-color: #f9f2ff;
  font-family: "Noto Sans KR", sans-serif;
}

/* 코드 블록 (pre) */
pre.code-block-pre {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 1em;
  overflow: auto;
  margin: 1.5em 0;
  border-left: 4px solid #9c27b0;
  font-family: "Consolas", "Monaco", monospace;
  font-size: 0.9rem;
  color: #333;
}

/* 코드 블록 내부 code */
pre.code-block-pre code {
  font-family: "Consolas", "Monaco", monospace;
  color: #6a1b9a;
}

/* 인라인 코드 */
code.inline-code {
  background-color: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: "Consolas", "Monaco", monospace;
  font-size: 0.9em;
  color: #6a1b9a;
}

/* 구분선 */
hr.hr-gradient {
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(156, 39, 176, 0),
    rgba(156, 39, 176, 0.75),
    rgba(156, 39, 176, 0)
  );
  margin: 2em 0;
}

/* 숫자 리스트 */
ol.ol-styled {
  margin-bottom: 1.2em;
  padding-left: 2em;
  color: #333;
  font-family: "Noto Sans KR", sans-serif;
}

/* 숫자 리스트 항목 */
ol.ol-styled li {
  margin-bottom: 0.5em;
  position: relative;
}

/* 불릿 리스트 컨테이너 */
ul.ul-bullet {
  margin-bottom: 1.2em;
  padding-left: 2em; /* 기본 들여쓰기 */
  list-style-type: none; /* 기본 불릿 제거 */
  color: #333;
  font-family: "Noto Sans KR", sans-serif;
}

/* 불릿 리스트 항목 */
ul.ul-bullet li {
  margin-bottom: 0.5em;
  position: relative;
  padding-left: 20px; /* 커스텀 불릿 공간 */
}

/* 커스텀 불릿 심볼 */
ul.ul-bullet li::before {
  content: ""; /* 가상 요소 내용 */
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #9c27b0;
  margin-right: 10px;
  position: absolute;
  left: 0; /* li의 padding-left를 고려 */
  top: 8px; /* 텍스트 기준 세로 위치 조정 */
}

/* 글상자 */
div.box-info {
  border: 1px solid #e1bee7;
  padding: 1em;
  border-radius: 4px;
  margin: 1.5em 0;
  background-color: #f3e5f5;
  font-family: "Noto Sans KR", sans-serif;
}
div.box-info p {
  /* 글상자 내부 p 태그 스타일 */
  margin: 0;
  line-height: 1.6;
}

/* 경고/주의 상자 */
div.box-warning {
  border-left: 4px solid #ff5722;
  padding: 1em;
  border-radius: 4px;
  margin: 1.5em 0;
  background-color: #fff3e0;
  color: #e64a19;
  font-family: "Noto Sans KR", sans-serif;
}
div.box-warning .box-title {
  /* 경고/주의 상자 제목 */
  font-weight: 700;
  margin-bottom: 0.5em;
  font-size: 1.1rem;
}
div.box-warning p {
  /* 경고/주의 상자 내부 p 태그 스타일 */
  margin: 0;
  line-height: 1.6;
}

/* 메모/노트 박스 */
div.box-note {
  border-left: 4px solid #2196f3;
  padding: 1em;
  border-radius: 4px;
  margin: 1.5em 0;
  background-color: #e3f2fd;
  color: #0d47a1;
  font-family: "Noto Sans KR", sans-serif;
}
div.box-note .box-title {
  /* 메모/노트 박스 제목 */
  font-weight: 700;
  margin-bottom: 0.5em;
  font-size: 1.1rem;
}
div.box-note p {
  /* 메모/노트 박스 내부 p 태그 스타일 */
  margin: 0;
  line-height: 1.6;
}

/* 일반 링크 스타일 */
a.link-styled {
  color: #6a1b9a;
  text-decoration: none;
  font-weight: 500;
  padding: 2px 4px;
  border-radius: 4px;
  background-color: #f3e5f5;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  /*background: linear-gradient(to right, #9c27b0, #8e24aa); /* 이 부분은 CSS 가상 요소나 다른 기법으로 구현 필요 */
  /*background-size: 100% 2px; /* 하이라이트 효과 */
  /*background-position: 0 100%;*/
  /*background-repeat: no-repeat;*/
  /*text-shadow: 0px 0px 1px rgba(156, 39, 176, 0.1);*/
}

a.link-styled:hover {
  background-color: #e1bee7;
  color: #4a148c;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(106, 27, 154, 0.1);
}

/* 링크 하단 강조 효과 (가상 요소 사용) */
a.link-styled::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #9c27b0, #8e24aa);
  opacity: 0.75; /* 그림자 효과 대신 투명도 조절 */
}

/* 다운로드 링크 */
a.link-download {
  display: inline-block;
  padding: 0.5em 1em;
  background-color: #9c27b0;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  margin: 1em 0;
  font-family: "Noto Sans KR", sans-serif;
}

/* 테이블 스타일 */
table.table-styled {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
  font-family: "Noto Sans KR", sans-serif;
}

/* 테이블 헤더 셀 */
table.table-styled th {
  border: 1px solid #e1bee7;
  padding: 0.5em;
  text-align: left;
  background-color: #9c27b0;
  color: white;
  font-weight: 700;
}

/* 테이블 데이터 셀 */
table.table-styled td {
  border: 1px solid #e1bee7;
  padding: 0.5em;
  text-align: left;
}
/* 강조 박스 (보라색 배경) */
div.box-emphasis {
  background-color: #9c27b0;
  color: white;
  padding: 1em;
  border-radius: 4px;
  margin: 1.5em 0;
  font-family: "Noto Sans KR", sans-serif;
}
div.box-emphasis p {
  /* 강조 박스 내부 p 태그 스타일 */
  margin: 0;
  line-height: 1.6;
  font-weight: 600;
}

/* Q&A 컨테이너 */
div.qa-container {
  margin: 1.5em 0;
  font-family: "Noto Sans KR", sans-serif;
}

/* Q 제목 컨테이너 */
div.qa-container .qa-q-title {
  font-weight: 700;
  color: #9c27b0;
  margin-bottom: 0.5em;
  font-size: 1.1rem;
}

/* Q 심볼 */
div.qa-container .qa-q-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background-color: #9c27b0;
  color: white;
  border-radius: 50%;
  margin-right: 8px;
}

/* Q 내용 컨테이너 */
div.qa-container .qa-q-content {
  margin-left: 32px;
  margin-bottom: 1em;
}
div.qa-container .qa-q-content p {
  /* Q 내용 내부 p 태그 스타일 */
  margin: 0;
  line-height: 1.6;
}

/* A 제목 컨테이너 */
div.qa-container .qa-a-title {
  font-weight: 700;
  color: #6a1b9a;
  margin-bottom: 0.5em;
  font-size: 1.1rem;
}

/* A 심볼 */
div.qa-container .qa-a-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background-color: #6a1b9a;
  color: white;
  border-radius: 50%;
  margin-right: 8px;
}

/* A 내용 컨테이너 */
div.qa-container .qa-a-content {
  margin-left: 32px;
}
div.qa-container .qa-a-content p {
  /* A 내용 내부 p 태그 스타일 */
  margin: 0;
  line-height: 1.6;
}

/* 하이라이트/형광펜 */
mark.highlight-mark {
  background-color: #e1bee7;
  color: #6a1b9a;
  padding: 0 3px;
  border-radius: 2px;
  font-family: "Noto Sans KR", sans-serif;
}

/* 키보드 입력 */
kbd.kbd-styled {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 2px 5px;
  font-family: "Consolas", "Monaco", monospace;
  font-size: 0.9em;
  color: #6a1b9a;
}

/* 정의 리스트 */
dl.dl-styled {
  margin: 1.5em 0;
  font-family: "Noto Sans KR", sans-serif;
}

/* 정의 용어 */
dl.dl-styled dt {
  font-weight: 700;
  color: #6a1b9a;
  margin-bottom: 0.3em;
}

/* 정의 설명 */
dl.dl-styled dd {
  margin-left: 2em;
  margin-bottom: 1em;
}

/* 각주 참조 번호 (sup) */
sup.footnote-sup {
  color: #9c27b0;
  font-weight: 600;
  font-size: 0.8em;
}
sup.footnote-sup a {
  /* 각주 참조 링크 */
  text-decoration: none;
  color: #9c27b0;
}

/* 각주 영역 컨테이너 */
div.footnotes-area {
  margin-top: 3em;
  padding-top: 1em;
  border-top: 1px solid #e1bee7;
  font-size: 0.9em;
  color: #666;
  font-family: "Noto Sans KR", sans-serif;
}
div.footnotes-area p {
  /* 각주 항목 내부 p 태그 스타일 */
  margin-bottom: 0.5em;
  line-height: 1.6;
}

/* 접기/펼치기 컨테이너 */
details.details-styled {
  border: 1px solid #e1bee7;
  border-radius: 4px;
  margin: 1.5em 0;
  font-family: "Noto Sans KR", sans-serif;
}
/* 접기/펼치기 요약 */
details.details-styled summary {
  padding: 0.5em 1em;
  background-color: #f3e5f5;
  font-weight: 600;
  color: #6a1b9a;
  cursor: pointer;
}
/* 접기/펼치기 내용 컨테이너 */
details.details-styled .details-content {
  padding: 1em;
}
details.details-styled .details-content p {
  /* 접기/펼치기 내용 내부 p 태그 스타일 */
  margin: 0;
  line-height: 1.6;
}

/* 푸터 영역 컨테이너 (예시) */
div.blog-footer {
  margin-top: 4em;
  padding-top: 1em;
  border-top: 1px solid #e1bee7;
  font-size: 0.9em;
  color: #666;
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
}
div.blog-footer p {
  /* 푸터 내부 p 태그 스타일 (예시) */
  margin: 0;
}
</style>
