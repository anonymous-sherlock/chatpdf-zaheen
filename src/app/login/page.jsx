import React from 'react'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/server";
export default function page() {
  return (
    <div>
        <LoginLink>Sign in</LoginLink>
<div>

<RegisterLink>Sign up</RegisterLink>
</div>
    </div>
  )
}
