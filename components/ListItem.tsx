import React from 'react'
import Link from 'next/link'

import { User } from '../interfaces/DayOfWeek'

type Props = {
  data: User
}

const ListItem = ({ data }: Props) => (
  <Link href="/users/[id]" as={`/users/${data.id}`}>
    {data.id}:{data.name}
  </Link>
)

export default ListItem
