import { notFound } from 'next/navigation'

import getUserByUsername from '@/lib/user-service'
import { isFollowingUser } from '@/lib/follow-service'
import Actions from '../_components/navbar/actions'
import Action from './_components/actions'

interface UserPageProps {
  params: {
    username: string
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username)

  if (!user) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
//   const isBlocked = await isBlockedByUser(user.id)

//   if (isBlocked) {
//     notFound()
//   }


  return (
    <div className='flex flex-col gap-y-4'>
        <p>username:{user.username}</p>
        <p>user ID:{user.id}</p>
        <p>is Following {`${isFollowing}`} </p>
        <Action userId={user.id} isFollowing={isFollowing}/>
    </div>
  )
}
export default UserPage