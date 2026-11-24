# ART NFT 藝術家交易平台

六角學院切版直播班第八週作業。使用 Nuxt 4、Vue 3、TypeScript 與 Tailwind CSS 4，部署於 Cloudflare Workers。

[線上展示](https://hex-f2e-live-week8-art-nft.piafyoyo06.workers.dev/) · [Adobe XD 設計稿](https://xd.adobe.com/view/bcf8f7eb-689c-4850-b531-a78259c0cdd8-e9ab/grid/) · [課程素材](https://github.com/hexschool/2022-web-layout-training/tree/main/week8-202207)

## 本機執行

需要 Node.js 24 以上。

```sh
npm ci
npm run dev
```

- `npm run verify` 執行型別檢查與靜態建置。
- `npm run preview` 使用 Wrangler 預覽建置結果。
- `npm run deploy` 建置並部署至 Cloudflare。

## 頁面與互動

首頁、藝術家作品與收藏、系列篩選與排序、作品詳情、市值排行和探索搜尋。版面以 XD 的 1440px 桌機與 360px 手機為基準，也支援平板。

市值、出價和錢包連結使用作業示範資料。
