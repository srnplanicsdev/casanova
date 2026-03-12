
import {jwtDecode} from 'jwt-decode'

export  function getUserRole(token) {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.role; 
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}