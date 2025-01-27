/**
 * Generates a random salt
 * @param {number} length - Length of the salt (in bytes)
 * @returns {ArrayBuffer} The random salt
 */

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
   * @param {string} password - The plain text password to verify
   * @param {string} storedHash - The previously stored hash to compare against
   * @param {ArrayBuffer} salt - The salt used to hash the password initially
   * @returns {Promise<boolean>} Whether the password matches
   */
  const verifyPassword = async (username, password) => {
    try {
        const { data } = await axios.get('http://localhost:5000/users');
            
        // Check if a specific username already exists
        const userExists = data.some(user => user.username === username);
    
        if (userExists) {
            salt = data.find(user => user.username === username).salt;
            const stringArray = salt.split(',');
            const numberArray = stringArray.map(Number);
            salt = new Uint8Array(numberArray);
            
            storedHash = data.find(user => user.username === username).password;
            return;
        } 
    } catch (error) {

    }
    const hash = await hashPassword(password, salt);

    return hash === storedHash;
  };
  
  export { hashPassword, verifyPassword };
  