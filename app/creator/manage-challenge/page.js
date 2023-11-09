"use client"
import ChallengeResults from "@/components/ChallengeResults"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [attempts, setAttempts] = useState([])

  useEffect(() => {
    document.body.addEventListener('keydown', function(event) {
      if (event.key === 'q') {
        router.push("/creator")
      }
    });
  }, [])

  const onLoad = async () => {
    //const response = await axios.get(
    //"/api/v1/platform/image",
    //{
    //headers: {
    //Authorization: "Basic " + btoa("test:test"), // Replace with your authorization token
    //},
    //}
    //);
    //// Iterate through the responseData to display image names
    //// Extract image names and set them in the state
    //const responseData = response.data;
    //const responseStatus = response.status;
    //console.log("Response Data:", responseData);
    //console.log("Response Status:", responseStatus);

  }

  return (
    <section>
      <ChallengeResults router={router} />
    </section>
  )
}
