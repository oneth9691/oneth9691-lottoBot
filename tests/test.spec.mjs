import { test, expect } from '@playwright/test';
import axios from 'axios'; // axios 라이브러리를 임포트

test('test', async ({ page }) => {
  //Playwright 코드: 웹 페이지에 액세스하고 정보 추출
  

  const webhookUrl = 'https://hooks.slack.com/services/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'; // Slack 웹훅 URL을 여기에 입력하세요.

  const message = {
    text: '안녕하세요, Slack 웹훅을 통해 메시지를 보냅니다!뀨',
    // 원하는 다른 메시지 속성을 추가할 수도 있습니다.
  };
  
  // Slack 웹훅에 POST 요청 보내기
  axios.post(webhookUrl, message)
    .then((response) => {
      console.log('메시지를 성공적으로 보냈습니다.');
    })
    .catch((error) => {
      console.error('메시지 전송 중 오류 발생:', error);
    });
});