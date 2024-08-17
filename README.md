# タスク管理アプリケーション
## 概要
このタスク管理アプリケーションは、ユーザーがタスクを安全に作成、表示、更新、および削除できるように設計されています。JWTを使用した認証機能により、各ユーザーのタスクが個別に管理され、プライバシーとデータの整合性が保たれます。また、新規ユーザーの登録機能も備わっており、ユーザーが簡単にアカウントを作成できます。Reactを使用して構築されており、スケーラビリティ、保守性、および簡単にデプロイ可能な設計がされています。

## 機能-**ユーザー認証:** セキュアな登録、ログイン、ログアウト機能。
-**新規ユーザー登録:** 新しいユーザーがアカウントを作成できます。

-**タスク管理:** タイトル、詳細、締め切り付きのタスクの作成、表示、更新、削除。

-**UI/UX:** 使いやすく直感的なインターフェース。

## 技術スタック-**フロントエンド:** React, Axios, Vite, React Query。
-**バックエンド:** NestJS（このリポジトリには含まれていません）, TypeORM, Swagger, Passport-JWT。

-**データベース:** PostgreSQL。

-**デプロイ:** Google Cloud Run, Docker, GitHub Actions。

## セットアップ手順### 前提条件- Node.js および npm がインストールされていること。
- デプロイのためのGoogle Cloud SDK。

### リポジトリをクローン```bash
```
git clone https://github.com/Dip11/medic-media-coding-test-frontend.git
cd medic-media-coding-test-frontend
```
## 依存関係をインストール
```
npm install
```

## 環境変数
ルートディレクトリに .env ファイルを作成し、次の内容を追加してください:
```
ENVIRONMENT=production
PORT=4001
VITE_API_PATH=http://localhost:8080/api
```

## アプリケーションの起動
```
npm run dev
```
アプリケーションは http://localhost:4001 で利用可能です。

## デプロイ手順
### アプリケーションのDocker化
プロジェクトにはすでに Dockerfile が含まれているため、新しいものを作成する必要はありません。

### Dockerイメージのビルドとプッシュ
```
docker build -t gcr.io/your-project-id/task-frontend .
```

### Google Cloud Runへのデプロイ
```
gcloud run deploy task-frontend \
  --image gcr.io/your-project-id/task-frontend \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated
```

## CI/CDセットアップ
### CI/CDパイプラインはGitHub Actionsを使用して設定されています。ワークフローファイルは .github/workflows/google-cloudrun-docker.yml に配置されています。

ファイル内の次のセクションを更新してください:

```
env:
  PROJECT_ID:your-google-cloud-project-id# Google CloudプロジェクトIDを新
  GAR_NAME:your-artifact-registry-name# Artifact Registry名を更新
  GAR_LOCATION:asia-northeast1# Artifact Registryの場所を確認または更新
  SERVICE:your-cloud-run-service-name# Cloud Runサービス名を更新
  REGION:asia-northeast1# Cloud Runサービスのリージョンを確認または更新
```

## 監視
デプロイプロセスはGitHub ActionsまたはGCPコンソールで監視できます。デプロイが完了すると、アプリケーションはGoogle Cloud Run上で稼働します。
