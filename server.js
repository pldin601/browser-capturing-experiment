const puppeteer = require('puppeteer-stream')
const fs = require('fs');

const file = fs.createWriteStream(__dirname + "/test.webm");

;(async () => {
  // const child = spawn('ffplay', ['-'], {stdio:['pipe', 'inherit', 'inherit']});
  const url = 'https://soundcloud.com/platform/sama'
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false,
    args: [
      // `--window-size=1280,720`,
      // '--enable-experimental-web-platform-features',
      // '--disable-infobars',
      // '--enable-usermedia-screen-capturing',
      // '--allow-http-screen-capture',
      // '--auto-select-desktop-capture-source=webclip',
      // '--ignore-certificate-errors',
      // '--unsafely-treat-insecure-origin-as-secure=' + url,
      '--use-fake-ui-for-media-stream',
      // '--no-sandbox',
    ],
    defaultViewport: {
        width: 1280,
        height: 720,
    }
  });


  const page = await browser.newPage()
  await page.goto(url)
  // await page.exposeFunction('onMessageReceivedEvent', (buffer) => {
  //   const array = new Uint8Array(buffer)
  //   // child.stdin.write(array);
  // });
  const stream = await puppeteer.getStream(page, { audio: true, video: true });
  //
  stream.pipe(file);
  //
  setTimeout(async () => {
    await stream.destroy();
    file.close();
  }, 1000 * 10);

  // page.evaluate(async () => {
  //   const stream = await navigator.mediaDevices.getDisplayMedia({
  //     video: true,
  //     audio: true
  //   })
  //   const recorder = new window.MediaRecorder(stream, { mimeType: 'video/webm' })
  //
  //   recorder.addEventListener('dataavailable', async (event) => {
  //     if (event.data && event.data.size) {
  //       onMessageReceivedEvent([...new Uint8Array(await event.data.arrayBuffer())])
  //     }
  //   })
  //
  //   recorder.start(1000)
  // })
})()
