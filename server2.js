const { launch, getStream } = require("puppeteer-stream");
const fs = require("fs");

// const file = fs.createWriteStream(__dirname + "/output/test.webm");

async function test() {
  const browser = await launch({
    // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    executablePath: '/usr/bin/chromium',
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: [
      // `--window-size=1920,1080`,
      `--no-sandbox`,
      // `--kiosk`
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto("https://soundcloud.com/platform/sama");
  const stream = await getStream(page, { audio: true, video: true });

  stream.pipe(process.stdout);
  setTimeout(async () => {
    await stream.destroy();
    // file.close();
    await browser.close();
  }, 1000 * 30);
}

test();
