"use client"
import ChallengeResults from "@/components/ChallengeResults"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <section>
      <ChallengeResults router={router}/>
    </section>
  )
}
