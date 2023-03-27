const { launch, getStream } = require("puppeteer-stream");

async function test() {
  const browser = await launch({
    executablePath: '/usr/bin/chromium',
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: [
      `--no-sandbox`,
    ]
  });

  const page = await browser.newPage();
  await page.goto("https://soundcloud.com/platform/sama");
  const stream = await getStream(page, { audio: true, video: true });

  stream.pipe(process.stdout);

  setTimeout(async () => {
    await stream.destroy();
    await browser.close();
  }, 1000 * 60);
}

test();
