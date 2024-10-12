// import React from 'react'
// import { LINKS } from './constant'
// // import Link from 'next/link'
// import {Link} from 'react-scroll'
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';

// const Nav = async ({containerStyles, linkStyles}: navProps) => {
//     const session = await getServerSession(authOptions);
//   return (
//     <nav className={`${containerStyles}`}>
//       {LINKS.map((link) => (
//         <Link
//         key={link.title}
//         to={link.path}
//         offset={link.offset}
//         spy={true}
//         smooth={true}
//         duration={500}
//         activeClass='active'
//         className={`${linkStyles}`}
//         >
//         {link.title}
//         </Link>
//       ))}
//     </nav>
//   )
// }

// type navProps = {
//   containerStyles: string;
//   linkStyles: string
// }

// export default Nav

import React from 'react'
import { LINKS } from './constant'
// import Link from 'next/link'
import {Link} from 'react-scroll'

const Nav = ({containerStyles, linkStyles}: navProps) => {
  return (
    <nav className={`${containerStyles}`}>
      {LINKS.map((link) => (
        <Link
        key={link.title}
        to={link.path}
        offset={link.offset}
        spy={true}
        smooth={true}
        duration={500}
        activeClass='active'
        className={`${linkStyles}`}
        >
        {link.title}
        </Link>
      ))}
    </nav>
  )
}

type navProps = {
  containerStyles: string;
  linkStyles: string
}

export default Nav