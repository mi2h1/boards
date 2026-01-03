# Game Board

オンラインボードゲームポータル。複数のゲームを一つのサイトで提供する。

## プロジェクト概要

- **リポジトリ**: https://github.com/mi2h1/boards
- **公開URL**: https://mi2h1.github.io/boards/
- **デプロイ**: GitHub Actions → GitHub Pages

## 技術スタック

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4 (@tailwindcss/vite)
- Firebase Realtime Database（aoaと共用、無料枠内で運用）
- Lucide React（アイコン）

## ディレクトリ構造

```
src/
├── App.tsx                    # ポータル（名前入力・ゲーム選択）
├── games/
│   └── aoa/                   # アトランティスの深淵
│       ├── AoaGame.tsx        # ゲームのエントリーポイント
│       ├── components/        # UI コンポーネント
│       ├── hooks/             # aoa専用フック
│       └── lib/               # Firebase連携など
└── shared/
    └── hooks/
        └── usePlayer.ts       # プレイヤー名管理（共用）
```

## 実装済みゲーム

### アトランティスの深淵 (aoa)
- パス: `/boards/aoa`
- 状態: 完成・稼働中
- 元リポジトリから移植済み

## 未実装ゲーム

### 文字ゲス (moji-guess)
- パス: `/boards/moji-guess`（予定）
- 状態: 未着手
- 概要: 「あいうえバトル」風のひらがな当てゲーム
- 仕様: GitHubリポジトリ https://github.com/mi2h1/moji-guess のmdファイル参照

## URL ルーティング

- `/boards/` → ゲーム選択画面
- `/boards/aoa` → アトランティスの深淵
- `/boards/moji-guess` → 文字ゲス（予定）

GitHub Pagesでは404.htmlによるSPAリダイレクトを使用。

---

# 開発ポリシー

## セッション開始時の自動確認

**重要**: 新しいセッション（会話）が開始されたら、ユーザーからの指示を待たずに、まずこのCLAUDE.mdを読み込んで内容を把握すること。これにより作業方針の一貫性を保つ。

## コミュニケーション原則

### 言語設定
- **基本会話は日本語で行う**
- **カジュアルだけど敬語で会話する**（堅すぎず、フレンドリーに）
- コード内の変数名・関数名は英語、コメントは日本語とする

## コミットメッセージ原則

### 基本方針
- **日本語でコミットメッセージを記録する**
- 変更内容を詳細に説明し、将来のメンテナンス性を向上させる

### コミットメッセージ構造
```
type: 簡潔な変更概要

## 変更内容
- 具体的な変更点1
- 具体的な変更点2

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### コミットタイプ
- `feat`: 新機能追加
- `fix`: バグ修正
- `refactor`: リファクタリング
- `docs`: ドキュメント更新
- `style`: コードスタイル修正
- `chore`: その他の作業

## 命名規則

### フロントエンド（TypeScript/React）

| 対象 | 規則 | 例 |
|------|------|-----|
| ページファイル | PascalCase + `Page`接尾辞 | `GamePage.tsx`, `LobbyPage.tsx` |
| コンポーネントファイル | PascalCase | `HiraganaBoard.tsx`, `PlayerList.tsx` |
| コンポーネント名 | PascalCase（ファイル名と同じ） | `HiraganaBoard`, `PlayerList` |

### 共通ルール
- **英語を使用**: 変数名・関数名・クラス名はすべて英語
- **略語は避ける**: `calc` → `calculation`, `btn` → `button`（ただし一般的な略語 `id`, `url` は可）
- **一貫性を優先**: 既存コードのパターンに従う

## 開発プラクティス

### ファイル編集
- 既存ファイルの編集を優先する
- 新規ファイル作成は必要最小限に留める
- コードスタイルは既存プロジェクトに合わせる

### エラーハンドリング
- 部分的な障害が全体に影響しないよう配慮
- 適切なログ出力とユーザーフィードバック

### UI/UX設計
- 論理的な機能グループ化
- 無意味な指標や冗長な表示の排除
- モバイルフレンドリーな設計

### 絵文字・アイコンの使用方針
- **UIラベルやボタンでは絵文字を使用しない**
- アイコンが必要な場合は **Lucide React** を使用する
  - インポート例: `import { Play } from 'lucide-react';`
  - 使用例: `<Play className="w-4 h-4" />`
- **例外**: 結果画面の勝者表示など、演出目的では絵文字を使用可

## 注意事項
- セキュリティベストプラクティスの遵守
- 既存機能への影響を最小限に抑制
- 段階的に動くものを作りながら進める（バイブコーディング）
