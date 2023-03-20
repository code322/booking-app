export const IsLoggedLocalStorage = {
  getIsLoggedIn: function (): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn')!);
  },
  setIsLoggedInFalse: function () {
    return localStorage.setItem('isLoggedIn', JSON.stringify(false));
  },
  setIsLoggedInTrue: function () {
    return localStorage.setItem('isLoggedIn', JSON.stringify(true));
  },
  clearIsLoggedIn: function () {
    return localStorage.removeItem('isLoggedIn');
  },
};
