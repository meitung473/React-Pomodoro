# React Pomodoro 番茄鐘
來自 《THE F2E 前端精神時光屋 2nd》的番茄鐘   
**設計稿** :   
**網址** : 

👉[DEMO]




## DEMO
-   mobile
![mobile]()
-   desktop
![desktop]()

## 說明

**使用技術 :**
-   React Hooks
-   react-router-dom 提供的 HashRouter 建立路由
-   Redux/Redux toolkit
-   styled-components 以 JSX 語法撰寫 CSS 樣式
-   React-chart.js 套件使用客製化表格，調整顯示的資料
-   moment.js 套件
-   uuid 套件，使用 v4 用來產生不重複的 todoId
-   react-app-rewired 不 eject 的方式調整 webpack 設定，應用在 resolve 簡潔路徑
-   Prop-Types 型別檢查
-   ESLint、Prettier 套件檢查語法，統一 coding style 

**其他 :**
- 多個 custom Hooks :
  - useMediaQuery : 實現 RWD 瀏覽
  - useInterval : 
  - useClock : 
  - useModal : 
- React Design Pattern ─ compound components 

## TODO


## 資料夾結構


## Function Map
- [x] 待辦事項
	- [x] 設定待辦事項名稱或內容  
	- [x] 設定待辦事項成已完成狀態  
	- [x] 調整排列順序  
	- [x] 蕃茄鐘  
- [x] 固定時間區間  
	- [x] 主工作時間：25 分鐘  
	- [x] 短休息時間：5 分鐘  
- [x] 時間倒數介面   
	- [x] 顯示進行中待辦事項  
	- [x] 有開始鍵能啟動倒數  
	- [x] 能暫停倒數   
	- [x] 能略過倒數  
	- [x] 顯示倒數時間  
	- [x] 提示鈴聲選項  
- [x] 狀態報表  
	- [x] 當天使用蕃茄鐘的記錄與成效  
	- [x] 當週使用蕃茄鐘的記錄與成效   

## User Story
- 使用者可以記錄代辦任務
- 使用者可以設定蕃茄鐘定時器
- 使用者可以透過報表檢視使用狀況
- 使用者可以替換鈴聲

## 參考資料




