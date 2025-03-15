import { getAuthSession } from "@/controller/actions";
import { redirect } from "next/navigation";


export default async function Home() {
    const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>Hello</div>
  )
}