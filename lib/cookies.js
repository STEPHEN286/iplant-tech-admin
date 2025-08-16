import Cookies from 'js-cookie';

// Cookie configuration
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
};

// Client-side cookie operations
export const clientCookies = {
  set: (name, value, options = {}) => {
    return Cookies.set(name, value, { ...COOKIE_OPTIONS, ...options });
  },
  
  get: (name) => {
    return Cookies.get(name);
  },
  
  remove: (name) => {
    return Cookies.remove(name);
  },
  
  getAll: () => {
    return Cookies.get();
  }
};

// Server-side cookie operations (for SSR)
export const serverCookies = {
  set: (res, name, value, options = {}) => {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      ...options
    };
    
    res.setHeader('Set-Cookie', `${name}=${value}; ${Object.entries(cookieOptions)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ')}`);
  },
  
  get: (req, name) => {
    const cookies = req.headers.cookie;
    if (!cookies) return null;
    
    const cookie = cookies.split(';').find(c => c.trim().startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
  },
  
  remove: (res, name) => {
    res.setHeader('Set-Cookie', `${name}=; Max-Age=0; Path=/; HttpOnly`);
  }
};

// Universal cookie operations (works on both client and server)
export const universalCookies = {
  set: (name, value, options = {}) => {
    if (typeof window !== 'undefined') {
      return clientCookies.set(name, value, options);
    }
    // Server-side would need res object passed
    return null;
  },
  
  get: (name, req = null) => {
    if (typeof window !== 'undefined') {
      return clientCookies.get(name);
    }
    return req ? serverCookies.get(req, name) : null;
  },
  
  remove: (name, res = null) => {
    if (typeof window !== 'undefined') {
      return clientCookies.remove(name);
    }
    return res ? serverCookies.remove(res, name) : null;
  }
};

export default clientCookies;


