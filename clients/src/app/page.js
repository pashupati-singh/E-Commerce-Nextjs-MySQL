"use client"
import { AuthContextProvider } from './AuthContext/page.js';
import Homefun from './home/page.js'

export default function Home() {
  return (
    <main>
      <div className="text-3xl font-bold underline">
    <AuthContextProvider>
    <Homefun />
    </AuthContextProvider>
      </div>
      </main>
  );
}
