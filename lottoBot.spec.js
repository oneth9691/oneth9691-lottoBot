import { test, expect } from '@playwright/test';
import axios from 'axios';

test('Send Slack Message', async ({page}) => {
  try {
    await page.goto('https://dhlottery.co.kr/user.do?method=login&returnUrl=https%3A%2F%2Fwww.dhlottery.co.kr%2FuserSsl.do%3Fmethod%3DmyPage');

    const url = page.url();
    console.log(`현재 페이지 주소: ${url}`);

    await page.getByPlaceholder('아이디').click();
    await page.getByPlaceholder('아이디').fill('ID');
    await page.getByPlaceholder('아이디').press('Tab');
    await page.getByPlaceholder('비밀번호').fill('PW');
    await page.getByPlaceholder('비밀번호').press('Enter');
    await page.goto('https://dhlottery.co.kr/userSsl.do?method=myPage');

    const url2 = page.url();
    console.log(`현재 페이지 주소: ${url2}`);

    //Playwright로 요소를 제거 화면밖 요소 확인이 안될수도있음
    await page.evaluate(() => {
      const elementToRemove = document.querySelector('.box_information');
      if (elementToRemove) {
        elementToRemove.remove();
      }
    });

   // 요소가 나타날 때까지 대기
    const element = await page.$('#article > div:nth-child(2) > div > div:nth-child(1) > table > tbody > tr:nth-child(1) > td:nth-child(4)');
    const originalText = await element.textContent();
    var extractedNumbers = originalText.replace(/\s/g, ''); // 공백 문자(띄어쓰기)를 모두 제거
    console.log(element);
    var formattedDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    console.log(formattedDate);
    await page.goto('https://dhlottery.co.kr/myPage.do?method=lotto645Detail&orderNo='+formattedDate+'&barcode='+extractedNumbers+'&issueNo=1');

    const url3 = page.url();
    console.log(`현재 페이지 주소: ${url3}`);

    // id가 'popup645paper'인 요소를 찾아서 스크린샷 캡처
    const elementId = 'popup645paper';
    const elementHandle = await page.$(`#${elementId}`);
    await elementHandle.screenshot({ path: 'LOTTO_' + formattedDate + '.png' });
    const imagePath = 'LOTTO_' + formattedDate + '.png';

    await page.goto('https://postimages.org/');
    await page.locator('#expire').selectOption('1');
    await page.getByText('Choose images').click();
    // 파일 업로드 input 엘리먼트를 찾기
    const fileInput = await page.$('input[type=file]');
    await fileInput.setInputFiles(imagePath);
    // "Upload Complete!" 텍스트가 포함된 div 엘리먼트가 나타날 때까지 대기
    await page.waitForSelector('#code_direct');
    // input 요소의 value 속성 값을 가져옵니다.
    const value = await page.$eval('#code_direct', (inputElement) => inputElement.value);
    console.log(value);

    const webhookUrl = 'https://hooks.slack.com/services/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';

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
      expect(response.status).toBe(200);
    })
    .catch((error) => {
      console.error('메시지 전송 중 오류 발생:', error);
      throw error;
    });

  } catch (error) {
    console.error('요소를 찾는 동안 오류 발생:', error);
  }

});