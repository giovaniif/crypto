## Create Password
- Users must be able to register a password
- Password have and identifier (title) and a value (the password itself)
- Passwords must be encrypted

### Flow
- Receives the password, title, and user id ✅
- If the user does not exists, returns an error ✅
- Else, call the encrypt password service ✅
- Call the create password service ✅
- Return the created password service ✅