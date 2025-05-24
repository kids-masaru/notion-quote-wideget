// Vercelサーバーレス関数 - Notion APIから名言を取得
const { Client } = require('@notionhq/client');
require('dotenv').config();

// Vercel Serverless Function
module.exports = async (req, res) => {
  // CORSヘッダー設定
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // OPTIONSリクエスト（プリフライト）への対応
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GETリクエスト以外は許可しない
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Notion APIクライアントの初期化
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    // データベースからすべての名言を取得
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    // 結果が空の場合はエラーを返す
    if (!response.results || response.results.length === 0) {
      return res.status(404).json({ error: 'No quotes found in the database' });
    }

    // ランダムに1つの名言を選択
    const randomIndex = Math.floor(Math.random() * response.results.length);
    const randomQuote = response.results[randomIndex];

    // Notionのデータ構造から必要な情報を抽出
    const quoteData = {
      // タイトル（名言本文）を取得
      quote: randomQuote.properties.title?.title?.[0]?.plain_text || '名言が見つかりません',
      
      // 分類情報を取得（存在する場合）
      category: randomQuote.properties['分類']?.select?.name || '',
      
      // 要約情報を取得（存在する場合）
      summary: randomQuote.properties['要約']?.rich_text?.[0]?.plain_text || '',
      
      // 更新日時
      lastUpdated: new Date().toISOString(),
    };

    // 成功レスポンスを返す
    return res.status(200).json(quoteData);
  } catch (error) {
    console.error('Error fetching quote from Notion:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch quote from Notion',
      details: error.message 
    });
  }
};
