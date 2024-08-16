import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import "App.css";
import theme from "theme/index.tsx";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "react-query/client.ts";

/**
 * React アプリケーションのエントリーポイントとして `root` DOM 要素にアプリケーションをレンダリングします。
 *
 * - `React.StrictMode`: 開発モードで一部の非推奨なAPIや潜在的な問題を検出するためのラッパー。
 * - `ChakraProvider`: Chakra UI のテーマをアプリケーション全体で適用するためのプロバイダー。
 * - `QueryClientProvider`: React Query のクライアントをアプリケーション全体で使用可能にするためのプロバイダー。
 * - `RouterProvider`: React Router のルーターをアプリケーション全体で使用可能にするためのプロバイダー。
 * - `React.Suspense`: 非同期コンポーネントの読み込み中に表示するフォールバックを定義します。
 * - `ReactQueryDevtools`: React Query のデバッグツールを表示するためのコンポーネント。
 */
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <React.Suspense fallback="Loading...">
          <RouterProvider router={router} />
        </React.Suspense>
      </React.StrictMode>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ChakraProvider>
);
