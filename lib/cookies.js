import Cookies from 'js-cookie'

// Cookie names
const TOKEN = 'tkn'

// Removed hotel cookies for jobseeker-only project

// Cookie options
const COOKIE_OPTIONS = {
  expires: 1, // 1 day
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/'
}

// Job Seeker Token management
export const setToken = (token) => {
  Cookies.set(TOKEN, token, COOKIE_OPTIONS)
}

export const getRefreshToken = () => Cookies.get("refresh");
export const setRefreshToken = (token) => {
  Cookies.set("refresh", token, COOKIE_OPTIONS);
};



export const  getToken = () => {
  return Cookies.get(TOKEN)
}

export const removeToken = () => {
  Cookies.remove(TOKEN, { path: '/' })
}














// Clear all auth cookies
export const clearAuthCookies = () => {
  removeToken()

}

// Clear specific user type cookies
export const clearJobSeekerCookies = () => {
  removeToken()
  
}

// clearHotelCookies removed



// Check if specific user type is authenticated
export const isAuthenticated = () => {
  return !!getToken() && !!getUser()
}

