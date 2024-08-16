import { QueryClient } from "react-query";

/**
 * `queryClient` は、React Query のクライアントインスタンスを作成します。
 *
 * このクライアントは、データフェッチングとキャッシングのために使用され、アプリケーション全体で
 * クエリの状態を管理します。React Query の `useQuery` や `useMutation` などのフックと共に
 * 使用され、データの取得、キャッシュ、同期、更新のロジックを一元管理します。
 *
 * `QueryClient` のインスタンスは通常、アプリケーションのルートコンポーネントで `QueryClientProvider`
 * と共に使用されます。
 */
export const queryClient = new QueryClient();
