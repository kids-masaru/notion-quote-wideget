# Notion名言ウィジェット - デプロイガイド

このドキュメントでは、Notion名言ウィジェットをVercelにデプロイする方法と、Notionに埋め込む方法を説明します。

## 1. Vercelへのデプロイ

### 前提条件
- [Vercelアカウント](https://vercel.com/signup)（GitHubアカウントでサインアップ可能）
- [GitHub](https://github.com/signup)アカウント（コードの保存用）

### デプロイ手順

#### 1.1 GitHubリポジトリの作成
1. GitHubにログインし、新しいリポジトリを作成します（例：`notion-quote-widget`）
2. リポジトリを自分のコンピュータにクローンします
3. 提供されたファイルをリポジトリにコピーします
4. 変更をコミットしてGitHubにプッシュします

#### 1.2 Vercelプロジェクトの作成
1. [Vercel](https://vercel.com/)にログインします
2. 「New Project」をクリックします
3. GitHubリポジトリをインポートします
4. 以下の設定を行います：
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: 空欄のままでOK
   - Output Directory: `frontend`

#### 1.3 環境変数の設定
1. プロジェクト設定画面で「Environment Variables」タブを開きます
2. 以下の環境変数を追加します：
   - `NOTION_API_KEY`: NotionのAPIキー
   - `NOTION_DATABASE_ID`: NotionデータベースのID

#### 1.4 APIエンドポイントの設定
1. `frontend/index.html`ファイルを開きます
2. `API_URL`の値をVercelのデプロイURLに更新します：
   ```javascript
   const API_URL = 'https://your-project-name.vercel.app/api';
   ```
3. 変更をコミットしてGitHubにプッシュします
4. Vercelが自動的に再デプロイします

## 2. Notionへの埋め込み

### 2.1 ウィジェットの埋め込み
1. Notionページを開きます
2. `/embed`と入力してエンベッドブロックを追加します
3. Vercelで公開されたウィジェットのURLを貼り付けます
4. 「Embed Link」をクリックします

### 2.2 サイズ調整
1. 埋め込まれたウィジェットをクリックします
2. 右下の角をドラッグしてサイズを調整します
3. 幅500px、高さ400px程度が推奨サイズです

## 3. カスタマイズ方法

### 3.1 デザインのカスタマイズ
`frontend/index.html`ファイルのCSSセクションを編集することで、以下の要素をカスタマイズできます：

- 色合い：`:root`セクションの変数を変更
- フォント：`body`セクションの`font-family`を変更
- サイズ：各要素の`font-size`や`padding`を調整

### 3.2 機能のカスタマイズ
`frontend/index.html`ファイルのJavaScriptセクションを編集することで、以下の機能をカスタマイズできます：

- 更新頻度：`scheduleNextUpdate`関数を修正
- 表示内容：`fetchQuote`関数内のHTML生成部分を修正

### 3.3 APIのカスタマイズ
`api/index.js`ファイルを編集することで、以下の機能をカスタマイズできます：

- 取得データ：Notionデータベースからの取得方法や条件を変更
- レスポンス形式：返却するJSONデータの構造を変更

## 4. トラブルシューティング

### 4.1 名言が表示されない場合
- Notion APIキーとデータベースIDが正しく設定されているか確認
- Notionデータベースの構造が想定通りか確認
- ブラウザの開発者ツールでエラーメッセージを確認

### 4.2 デザインが崩れる場合
- ブラウザの互換性を確認（最新のChrome、Firefox、Safariでテスト）
- レスポンシブデザインの設定を確認

### 4.3 自動更新されない場合
- ブラウザのタブがアクティブでないと、JavaScriptのタイマーが正確に動作しない場合があります
- 更新ボタンを手動でクリックして動作確認
