# ART NFT 藝術家交易平台

六角學院切版直播班第八週作業。使用 Nuxt 4、Vue 3、TypeScript 與 Tailwind CSS 4，部署於 Cloudflare Workers。

[線上展示](https://hex-f2e-live-week8-art-nft.piafyoyo06.workers.dev/) · [Adobe XD 設計稿](https://xd.adobe.com/view/bcf8f7eb-689c-4850-b531-a78259c0cdd8-e9ab/grid/) · [課程素材](https://github.com/hexschool/2022-web-layout-training/tree/main/week8-202207)

## 本機執行

需要 Node.js 24 以上。

```sh
npm ci
npm run dev
```

`npm run verify` 執行型別檢查與靜態建置，完成後可用 `npm run preview` 預覽。

推送到 `main` 時，Cloudflare Workers Builds 會執行 `npm run verify`，通過後自動部署。

## 頁面與互動

包含首頁、藝術家列表與作品／收藏、系列篩選與排序、作品詳情、市值排行、探索搜尋及 404。支援桌機、平板和手機，動效會配合系統的減少動態效果設定。

市值、出價和錢包連結使用作業示範資料。示範出價保存在使用者的瀏覽器內。系列篩選支援 ETH 和 BNB，BNB 顯示值採固定示範比例 1 ETH = 4 BNB。
