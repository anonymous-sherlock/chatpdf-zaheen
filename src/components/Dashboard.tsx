import { trpc } from "@/app/_trpc/client"


export default async function Dashboard() {

    const {data:files}= trpc.getUserFiles.useQuery()
  return (
    <div>
        
    </div>
  )
}
