const UIRoutes = {
  home: {
    name: 'navigation.home',
    path: '/',
  },
  admin: {
    name: 'navigation.admin/',
    path: '/admin',
  },
  dashboard: {
    name: 'menu.dashboard',
    path: '/admin/dashboard',
    relativePath: '/dashboard',
  },
  login: {
    name: 'navigation.login',
    path: '/login',
  },
};

interface UIRoutesTypes {
  name: string;
  path: string;
  relativePath?: string;
  pageTitle?: string;
  isNavRoute?: boolean;
}

export const WebRoutes: Record<keyof typeof UIRoutes, UIRoutesTypes> = UIRoutes;
