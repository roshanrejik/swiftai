import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
    webClientId: "1474332772-1u3dlcmuu9om6eolaklqge4fnep6gu0h.apps.googleusercontent.com", // ✅ Web client ID
    iosClientId: "1474332772-04vlnko7ju0o7h8od0m2haaij8bdivik.apps.googleusercontent.com", // ✅ Optional (for iOS)
    offlineAccess: true, // ✅ Needed for token refresh
});

export const googleSignin = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signOut();
    const signInResult = await GoogleSignin.signIn();
    return signInResult;
};
