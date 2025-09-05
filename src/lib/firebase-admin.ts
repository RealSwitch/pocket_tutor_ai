import { initializeApp, getApps, cert, App } from 'firebase-admin/app';

let app: App;

export async function initializeAdminApp() {
    if (getApps().length) {
        app = getApps()[0];
        return;
    }

    if (
        !process.env.FIREBASE_PROJECT_ID ||
        !process.env.FIREBASE_CLIENT_EMAIL ||
        !process.env.FIREBASE_PRIVATE_KEY
    ) {
        throw new Error('Missing Firebase Admin SDK credentials in environment variables.');
    }

    const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
    
    app = initializeApp({
        credential: cert(serviceAccount),
    });
}
