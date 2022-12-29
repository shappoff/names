declare module "*.svg" {
    const content: any;
    export default content;
}

declare namespace env {
    const apiKey: string;
    const authDomain: string;
    const databaseURL: string;
    const projectId: string;
    const storageBucket: string;
    const messagingSenderId: string;
    const appId: string;
    const applicationID: string;
    const adminAPIKey: string;
    const index_name: string;
}