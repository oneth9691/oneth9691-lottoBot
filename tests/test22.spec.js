import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://dhlottery.co.kr/user.do?method=login&returnUrl=https%3A%2F%2Fwww.dhlottery.co.kr%2FuserSsl.do%3Fmethod%3DmyPage');
  await page.getByPlaceholder('아이디').click();
  await page.getByPlaceholder('아이디').fill('istth0901');
  await page.getByPlaceholder('아이디').press('Tab');
  await page.getByPlaceholder('비밀번호').fill('KEYnumber00@@');
  await page.getByPlaceholder('비밀번호').press('Enter');
  await page.goto('https://www.dhlottery.co.kr/userSsl.do?method=myPage');


  const element = await page.$('#article > div:nth-child(2) > div > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(4)');
  const originalText = await element.textContent();
  var extractedNumbers = originalText.replace(/\s/g, ''); // 공백 문자(띄어쓰기)를 모두 제거
  console.log(extractedNumbers); 
  var formattedDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  console.log(formattedDate);
  await page.goto('https://www.dhlottery.co.kr/myPage.do?method=lotto645Detail&orderNo='+formattedDate+'&barcode='+extractedNumbers+'&issueNo=1');

});


// 메시지를 보낼 채널 ID 또는 사용자 ID
const channelId = 'YOUR_CHANNEL_ID';

// 보낼 메시지 텍스트
const messageText = '안녕하세요, Slack 메시지를 보냅니다!';

// Slack API 호출
axios.post(apiUrl, {
    channel: C05UZMUB96C,
    text: messageText,
}, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
})
.then(response => {
    console.log('메시지를 성공적으로 보냈습니다.');
})
.catch(error => {
    console.error('메시지 전송 중 오류 발생:', error);
});
// //document.querySelector("#article > div:nth-child(2) > div > div:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(4)").textContent