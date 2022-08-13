import { useEffect } from "react"

export default function NotionRedirect() {
  useEffect(() => {
    setTimeout(() => {
      window.open("https://www.notion.so/yashsehgal/yashsehgal-e408313280ad4f9aa5f5cc4b4672540f");
    }, 1000);
  }, []);
  return (
    <div className="notion-redirect">
      <h1 className="leading-snug text-2xl">
        {"Opening Notion Website..."}
      </h1>
    </div>
  )
}