import { createContext } from "react";
import { Gym } from "../model/gym";
import { User } from "../model/user";
import { Session } from "../model/session";

export type AppContext = {
    gym: Gym | null;
    setGym: (gym: Gym) => void;
    user: User | null;
    setUser: (user: User) => void;
    session: Session | null;
    setSession: (session: Session) => void;
}

export const AppContext = createContext<AppContext | null>(null);
