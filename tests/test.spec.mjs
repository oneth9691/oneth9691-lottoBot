import { test, expect } from '@playwright/test';
import axios from 'axios';

test('Send Slack Message', async ({}) => {
  const webhookUrl = 'https://hooks.slack.com/services/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';
  const message = {
    text: '안녕하세요, Slack 웹훅을 통해 메시지를 보냅니다!뀨',
  };

  // Slack 웹훅에 POST 요청 보내기
  await axios.post(webhookUrl, message)
    .then((response) => {
      console.log('메시지를 성공적으로 보냈습니다.');
      expect(response.status).toBe(200); // Slack 웹훅 요청이 성공적으로 완료되었는지 확인
    })
    .catch((error) => {
      console.error('메시지 전송 중 오류 발생:', error);
      throw error; // 테스트를 실패로 처리
    }); 
});