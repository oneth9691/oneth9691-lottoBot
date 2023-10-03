import { test, expect } from '@playwright/test';
import axios from 'axios';
// 다른 파일에서 서버 시작


test('Send Slack Message', async ({page}) => {

  await page.goto('https://dhlottery.co.kr/user.do?method=login&returnUrl=https%3A%2F%2Fwww.dhlottery.co.kr%2FuserSsl.do%3Fmethod%3DmyPage');
  await page.getByPlaceholder('아이디').click();
  await page.getByPlaceholder('아이디').fill('istth0901');
  await page.getByPlaceholder('아이디').press('Tab');
  await page.getByPlaceholder('비밀번호').fill('KEYnumber00@@');
  await page.getByPlaceholder('비밀번호').press('Enter');
   // 페이지에서 로그 출력
   page.on('console', (log) => {
    console.log(`Page Log: ${log.text()}`);
  });

  await page.goto('https://www.dhlottery.co.kr/userSsl.do?method=myPage');
  const element = await page.$('#article > div:nth-child(2) > div > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(4)');
  const originalText = await element.textContent();
  var extractedNumbers = originalText.replace(/\s/g, ''); // 공백 문자(띄어쓰기)를 모두 제거
  console.log(extractedNumbers); 
  var formattedDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  console.log(formattedDate);
  await page.goto('https://www.dhlottery.co.kr/myPage.do?method=lotto645Detail&orderNo='+formattedDate+'&barcode='+extractedNumbers+'&issueNo=1');
  
  const webhookUrl = 'https://hooks.slack.com/services/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';

  // id가 'popup645paper'인 요소를 찾아서 스크린샷 캡처
  const elementId = 'popup645paper';
  const elementHandle = await page.$(`#${elementId}`);
  await elementHandle.screenshot({ path: 'LOTTO_' + formattedDate + '.png' });
  const imagePath = 'LOTTO_' + formattedDate + '.png';


  await page.goto('https://postimages.org/');
  await page.locator('#expire').selectOption('1');
  await page.getByText('Choose images').click();
  // 파일 업로드 input 엘리먼트를 찾습니다.
  const fileInput = await page.$('input[type=file]');
  await fileInput.setInputFiles(imagePath);
  // "Upload Complete!" 텍스트가 포함된 div 엘리먼트가 나타날 때까지 대기
  await page.waitForSelector('#code_direct');
  // 텍스트 상자 (textbox) 엘리먼트를 찾음
// input 요소의 value 속성 값을 가져옵니다.
  const value = await page.$eval('#code_direct', (inputElement) => inputElement.value);
  // 텍스트 상자의 값을 가져와 변수에 저장
  // 이제 "copiedLink" 변수에 복사된 링크가 저장되어 있음
  console.log(value);

  const message = {
    text: '안녕하세요, Slack 웹훅을 통해 메시지를 보냅니다!뀨',
    attachments: [
      {
          fallback: "이미지",
          image_url: value,
      }
  ]
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