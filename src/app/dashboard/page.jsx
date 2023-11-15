
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
export default async function page() {

  const {getUser} = getKindeServerSession();
  const user = await getUser();

  if(!user || !user.id){
    redirect('/auth-callback?origin=dashboard')
  }

  const dbUser = await db.user.findFirst({
    where:{
      id:user.id
    }
  })

  if(!dbUser){
    redirect('/auth-callback?origin=dashboard')
  }
  
  return (
    <div>
      <div>{user.email}</div> 
      <div>{user.picture}</div> 
      <div>{user.given_name+ user.family_name}</div> 
      <div><img src={user.picture} className="rounded-full h-10" alt="" /></div>
    </div>
  )
}
