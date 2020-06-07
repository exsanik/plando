export const getLoggedInUser = (state) => !!state?.userData?.token
export const getUserEmail = (state) => !!state?.userData?.email
