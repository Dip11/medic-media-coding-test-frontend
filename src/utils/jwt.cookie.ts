const JWT_TOKEN_KEY = 'jwt-token';

export const setJWTCookie = (cookie: string): void => {
  const d = new Date();
  d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = JWT_TOKEN_KEY + '=' + cookie + ';' + expires + ';path=/';
};

export const getJWTCookie = () => {
  const name = JWT_TOKEN_KEY + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};
