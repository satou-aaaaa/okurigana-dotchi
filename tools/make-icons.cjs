// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、白い「送」の字と、送りがなの赤いしるし。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <text x="44" y="68" font-size="54" font-weight="900" text-anchor="middle" fill="#fffdf7" font-family="'Noto Sans CJK JP',sans-serif">送</text>
      <text x="80" y="80" font-size="30" font-weight="900" text-anchor="middle" fill="#f6a08f" font-family="'Noto Sans CJK JP',sans-serif">る</text></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
