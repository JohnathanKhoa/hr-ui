import authOptions from "@/app/lib/configs/auth/authOptions";
import { AuthSession } from "@/types";
import { getServerSession } from "next-auth";

require('dotenv').config()

const url = process.env.LOCAL_ENV;

export const getAuthSession = async () => {
  const session = (await getServerSession(authOptions)) as AuthSession;
  if (!session) {
    return null;
  }

  const currentTimestamp = Math.floor(Date.now());
  if (currentTimestamp >= session.user.expires_at * 1000) {
    return null;
  }

  return session;
};

export const customGet = async (url: string, session: AuthSession | null) => {
    if (!session) {
      return null;
    }
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    }).then((res) => res.json());
  
    return res;
};

export const customPost = async (url: string, token?: String | null, data?:Object) => {
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
      },
      body: JSON.stringify(data)
    }).then((res) => res.json());
  
    return res;
  };

export const login = async (
    username: String,
    password: String

  ):Promise<String> => {
    return customPost(url + '/login', null, {username, password})
  };