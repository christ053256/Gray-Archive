import axios from 'axios';

/**
 * Generates a random salt
 * @param {number} length - Length of the salt (in bytes)
 * @returns {ArrayBuffer} The random salt
 */
// asd
/**
 * Hashes a password using SHA-256 with a salt
 * @param {string} password - The plain text password to hash
 * @param {ArrayBuffer} salt - The salt to combine with the password
 * @returns {Promise<string>} The resulting hash as a hex string
 */
const hashPassword = async (password, salt) => {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltedPassword = new Uint8Array(passwordBuffer.length + salt.byteLength);

  // Combine the password and the salt into a single buffer
  saltedPassword.set(passwordBuffer, 0);
  saltedPassword.set(new Uint8Array(salt), passwordBuffer.length);

  // Hash the combined password + salt using SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', saltedPassword);

  // Convert the hash to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  return hashHex;
};

/**
 * Verifies a password by comparing the stored hash with the hash of the entered password
 * @param {string} username - The username to verify
 * @param {string} password - The plain text password to verify
 * @returns {Promise<string>} The resulting hash to compare with the stored one
 */
const verifyPassword = async (username, password) => {
  let login_salt = crypto.getRandomValues(new Uint8Array(16)); // Fallback salt

  try {
    const { data } = await axios.get('http://localhost:5000/user_salt');
    
    // Check if the user exists and retrieve their salt
    const user = data.find(user => user.username === username);
    if (user) {
      login_salt = new Uint8Array(user.salt.split(',').map(Number));
    }
  } catch (error) {
    console.error('Error fetching salt:', error);
    // Return a relevant message or handle accordingly
    return 'Error fetching salt';
  }

  const hash = await hashPassword(password, login_salt);
  return hash;
};

export { hashPassword, verifyPassword };
