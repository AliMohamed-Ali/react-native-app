import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "6649f1bc0014574b1951",
  databaseId: "6649f439001fa97f63eb",
  userCollectionId: "6649f471003108beb582",
  videoCollectionId: "6649f4cc0005ff459124",
  storageId: "6649f7c8002fa102b20d",
};
const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

const client = new Client();

client
  .setEndpoint(endpoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Account not created");
    const avatarUrl = avatars.getInitials(username);
    await singIn(email, password);
    const newUser = await database.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        avatar: avatarUrl,
        email,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const singIn = async (email, password) => {
  try {
    // await account.deleteSessions();
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Account not found");
    const user = await database.listDocuments(databaseId, userCollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);
    // console.log(user);
    if (!user) throw new Error("User not found");

    return user.documents[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getAllPosts = async () => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
    ]);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getLatest = async () => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getUsersPosts = async (userId) => {
  try {
    const posts = await database.listDocuments(databaseId, videoCollectionId, [
      Query.equal("users", userId),
      Query.orderDesc("$createdAt"),
    ]);
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const session = await account.deleteSessions("current");
    return session;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else {
      throw new Error("Invalid file type");
    }
    if (!fileUrl) throw new Error("File not found");
    return fileUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    uri: file.uri,
    size: file.fileSize,
  };
  try {
    const uploadFile = await storage.createFile(storageId, ID.unique(), asset);
    const fileUrl = await getFilePreview(uploadFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await database.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        users: form.userId,
      }
    );
    return newPost;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
