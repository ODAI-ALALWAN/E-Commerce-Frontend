import { allLink } from "./allNav.jsx";

export const getNav = (role) => {
    return allLink.filter(link => link.role === role)
} 