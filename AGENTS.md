# AGENTS.md

送りがなどっち：ことばの読みと文を見て、送りがなが正しい書き方を当てる1日5問の学習ゲーム。正解したら「どの決まりでそう書く？」（通則1〜7。付表の語は通則7と同じ「慣用で送らない」）も選ぶ。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（32種類×3000問：選び肢・答えは1つ・答えと2段目が別に書いた表どおり・許容の書き方をまちがいにしない・まぎらわしい書き方の入れ方・出典）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は文化庁「送り仮名の付け方」（昭和48年内閣告示第2号・平成22年一部改正）の通則1〜7と付表に書いてあることだけ（2026-11-17 に読んだ。要点は共有フォルダ games/okurigana-research.md）。種類を足すときも本文を読み、`qa/run.mjs` の `TB`（別に書いた表）にも足す。
- 答えは本則。告示が（ ）で示す許容の書き方（表わす・申込む・浮ぶ・曇 など。通則1・2・4・6 の許容は、挙がっている語だけ）は、まちがいの選び肢に入れない（`qa/run.mjs` の `ALLOW`）。許容がある語は説明で許容も見せる。告示の注意で例外にならない使い方（「光」「折」「係」「組」）は問題にしない。
- 公式の情報の代わりにしない：遊び方・「このゲームについて」・README に、公式の情報の代わりではないこと、決まりは文化庁のページで確かめること、許容をまちがいにしていないことを置く（QA が見る）。
- 問題は、やさしいが選び肢3つ（まぎらわしい書き方 `ng[0]` を入れない）、ふつうが4つ、むずかしいが4つ（`ng[0]` を必ず入れる）。2回目のヒントはまちがいを消して2つにしぼり、要点（`key`）も見せる。2段目は「どの決まりでそう書く？」（7つ）で、種類ごとに決まる（`grp`）。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回しの並びは最後に足すだけ（QA の `PIN` が第1回の1問目を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「どの決まりでそう書く？」・復習（1→3→7日後）。記録 `okr-v1`・文字 `okr-fs`・復習 `okr-depth`。
- 保存の読み直しは共通部品 `GameStore`（`<!-- store:begin -->`〜`end`。shared-workflows `template/store/store.js` の写しで、ここでは直さない）。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は信号よみ（shingo-yomi）から写した。写し元の言葉が残っていないかを QA が見る。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
