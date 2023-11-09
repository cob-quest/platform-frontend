"use client"
import ChallengeResults from "@/components/ChallengeResults"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter();

  const [attempts, setAttempts] = useState([])

  useEffect(() => {
    // set on press fo quitting
    document.body.addEventListener('keydown', function(event) {
      if (event.key === 'q') {
        router.push("/creator")
      }
    });
    onLoad()
  }, [])

  const onLoad = async () => {
    const response = await axios.get(
      "/api/v1/platform/attempt",
      {
        headers: {
          Authorization: "Basic " + btoa("test:test"), // Replace with your authorization token
        },
      }
    );
    const responseData = response.data;
    const responseStatus = response.status;
    setAttempts(responseData)
    console.log("Response Data:", responseData);
    console.log("Response Status:", responseStatus);

  }

  return (
    <section>
      <ChallengeResults
        rowHeader={["challengeName", "participant", "result", "resend"]}
        rowBody={attempts}
        router={router}
      />
    </section>
  )
}
