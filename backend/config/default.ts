const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const port = process.env.PORT;
const env = process.env.ENV;
const dbName: string = "CommunityDB";

export const config = {
    dbUri: `mongodb+srv://${dbUser}:${dbPass}@cluster0.helsns4.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    port,
    env
}