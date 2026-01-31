"use client";
import {useRouter} from "next/navigation";


export default function backButton() {
  const router = useRouter();

  return (
    <button
    onClick={() => router.back()}
    className="flex items-center gap-1 text-blue-600 hover:underline"
    >
      <span>←</span>
      <span>Back</span>
    </button>
  )
}