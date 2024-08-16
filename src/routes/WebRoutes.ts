/**
 * `UIRoutes` オブジェクトは、アプリケーション内のさまざまなルートを定義します。
 *
 * - `home`: ホームページへのルート。
 * - `admin`: 管理者エリアへのルート。
 * - `dashboard`: 管理者ダッシュボードへのルート。
 * - `login`: ログインページへのルート。
 * - `register`: ユーザー登録ページへのルート。
 *
 * 各ルートには、国際化やメニュー表示のために使用される `name` プロパティと、ルートの `path` が含まれます。
 * `dashboard` ルートには、現在のルートからの相対パスも定義されています。
 */
const UIRoutes = {
  home: {
    name: "navigation.home",
    path: "/",
  },
  admin: {
    name: "navigation.admin/",
    path: "/admin",
  },
  dashboard: {
    name: "menu.dashboard",
    path: "/admin/dashboard",
    relativePath: "/dashboard",
  },
  login: {
    name: "navigation.login",
    path: "/login",
  },
  register: {
    name: "navigation.register",
    path: "/register",
  },
};

/**
 * `UIRoutesTypes` インターフェースは、各ルートオブジェクトの型を定義します。
 *
 * - `name`: ルートに関連付けられた名前（通常は国際化キー）。
 * - `path`: アプリケーション内のルートの絶対パス。
 * - `relativePath`: （オプション）親ルートからの相対パス。通常はサブパスに使用されます。
 * - `pageTitle`: （オプション）ページのタイトルを設定するためのプロパティ。
 * - `isNavRoute`: （オプション）ルートがナビゲーションメニューに表示されるかどうかを示すフラグ。
 */
interface UIRoutesTypes {
  name: string;
  path: string;
  relativePath?: string;
  pageTitle?: string;
  isNavRoute?: boolean;
}

/**
 * `WebRoutes` は、`UIRoutes` オブジェクトを型付けし、キーに基づく型安全なルートマップを作成します。
 *
 * この定義により、`WebRoutes` オブジェクトを使用するときに、型の安全性が保証され、
 * 使用されるルートオブジェクトが `UIRoutesTypes` インターフェースに従うことが保証されます。
 */
export const WebRoutes: Record<keyof typeof UIRoutes, UIRoutesTypes> = UIRoutes;
