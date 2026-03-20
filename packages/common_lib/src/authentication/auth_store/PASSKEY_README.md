# Passkey Authentication Flow

## How Passkeys Work on Different Platforms

### On iOS/iPadOS (Safari)

- **First time (registration)**: Shows Face ID/Touch ID prompt to create passkey
- **Login**: Shows Face ID/Touch ID prompt directly in browser
- **Stored in**: iCloud Keychain (syncs across Apple devices)
- **No QR code**: Native biometric prompt only

### On Desktop (Chrome/Safari)

- **If passkey exists on THIS device**: Shows Touch ID prompt (Mac) or Windows Hello
- **If passkey exists on iPhone**: Shows QR code for hybrid authentication
- **Scan QR with iPhone**: Approve with Face ID on phone → logs in on desktop

### On Android

- **First time**: Shows fingerprint/face unlock to create passkey
- **Login**: Shows fingerprint/face unlock prompt
- **Stored in**: Google Password Manager (syncs across Android devices)

## Important: Registration Must Happen First

**You CANNOT authenticate with a passkey that doesn't exist yet!**

### Registration Flow:

1. User enters email/username
2. Call `authStore.setupPasskey()`
3. Browser shows biometric prompt
4. Passkey is saved to device/cloud
5. Now user can authenticate with it

### Authentication Flow:

1. User visits login page
2. Browser detects available passkeys
3. Shows passkey option (button or autofill)
4. User selects passkey → biometric prompt
5. Authenticated

## QR Code Behavior

**Why am I seeing a QR code?**

You see a QR code when:

1. **Testing on desktop** - But you have a passkey saved on your phone
2. **Cross-device registration** - Creating a passkey using phone for desktop
3. **No local passkey** - Desktop doesn't have passkey but phone does

**How to avoid QR code and see native iOS prompt:**

- Test directly on iPhone/iPad Safari
- Or create a passkey on the desktop device you're testing on

## Conditional UI (iOS Autofill Style)

For the best iOS experience, use "conditional UI" which shows passkeys in the password autofill:

```tsx
// In your email input field
<input
  type="text"
  autoComplete="username webauthn" // Important!
/>;

// Start conditional mediation
authStore.authenticateWithConditionalUI();
```

When user focuses the email field:

- iOS shows passkeys in QuickType bar above keyboard
- User taps passkey → Face ID → logged in
- No need for separate "Login with Passkey" button

## Testing Checklist

### Test on iOS Device:

1. Open Safari on iPhone/iPad
2. Go to registration page
3. Enter email, click "Create Passkey"
4. See Face ID prompt (no QR code)
5. Go to login page
6. Click "Login with Passkey"
7. See Face ID prompt (no QR code)

### Test Cross-Device (Desktop → iPhone):

1. Open Chrome on desktop
2. Click "Login with Passkey"
3. See QR code
4. Scan with iPhone camera
5. Approve with Face ID on iPhone
6. Desktop logs in

### Test Conditional UI:

1. Add `webauthn` to email input autocomplete
2. Start conditional mediation
3. Focus email field
4. See passkey in autofill suggestions
5. Tap passkey → Face ID → logged in

## Browser Compatibility

| Browser     | Platform   | Support         |
| ----------- | ---------- | --------------- |
| Safari 16+  | iOS/iPadOS | ✅ Full support |
| Safari 16+  | macOS      | ✅ Full support |
| Chrome 108+ | Android    | ✅ Full support |
| Chrome 108+ | Windows    | ✅ Full support |
| Chrome 108+ | macOS      | ✅ Full support |
| Edge 108+   | Windows    | ✅ Full support |

## Common Issues

### "No QR code on iOS"

✅ This is correct! iOS shows Face ID prompt directly

### "QR code on desktop"

✅ This is correct! It's for cross-device authentication

### "Nothing happens when I click login with passkey"

❌ No passkey registered yet - run registration first

### "Error: No passkey selected"

❌ User cancelled the prompt or no passkey exists

## Implementation Notes

### Registration requires:

- `identifier` (email/username) set in AuthStore
- User gesture (button click)
- HTTPS (won't work on http://)
- Valid RP ID (domain name)

### Authentication requires:

- At least one passkey registered for this site
- HTTPS
- Valid RP ID matching registration

### Conditional UI requires:

- `webauthn` in input autocomplete attribute
- Call mediation on page load (not on click)
- Browser support for conditional mediation
- At least one passkey registered

## Security Notes

- Passkeys are phishing-resistant (tied to domain)
- Private key never leaves device/cloud keychain
- Biometric data never sent to server
- Each site gets unique credential (no cross-site tracking)
- Replay attacks prevented by challenge-response
