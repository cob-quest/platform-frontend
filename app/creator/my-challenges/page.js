"use client"
import ChallengesByCreator from "@/components/ChallengeResults"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <section>
      <ChallengesByCreator router={router}/>
    </section>
  )
}