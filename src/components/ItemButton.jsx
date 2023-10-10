import React from 'react'
import { playHover,playClick } from './SoundEffect'
import Link from 'next/link'
import Image from 'next/image'

export default function ItemButton({uniqueName,imgSrc,linkTo}) {
  return (
    <li className='w-[200px] border-2 border-[#9b8f8f] border-b-transparent border-t-transparent' title={uniqueName} key={uniqueName} onClick={playClick} onMouseEnter={playHover} >
        <Link href={linkTo}>
            <Image className="w-[200px] h-[125px]" width={150} height={75} alt={uniqueName} src={imgSrc}/>
            <p className="bg-black p-1 uppercase text-ellipsis whitespace-nowrap overflow-hidden">{uniqueName}</p>
        </Link>
    </li>
  )
}
