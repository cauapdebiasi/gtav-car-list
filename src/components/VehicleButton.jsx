import React from "react";
import Image from "next/image";
import { HiUser } from "react-icons/hi2";
import { playClick, playHover } from "./SoundEffect";
import Link from "next/link";
import formatPrice from "./PriceFormatter";

function VehicleButton({
  vehicleName,
  vehicleCover,
  vehicleDLC,
  vehiclePrice,
  seats,
}) {

  return (
    <Link href={`/vehicle/${vehicleName}`} onClick={playClick} onMouseEnter={playHover} className="aspect-[161/136] w-[clamp(220px,100%,322px)] cursor-pointer block border-2 border-[#9b8f8f] border-b-transparent border-t-transparent">
      <div className="h-[20.6%] flex items-center bg-vehicle-card-header-gradient text-[#0b0c08] p-[8px]">
        <p className="w-[82%] text-[14px] uppercase">{vehicleDLC}</p>
        <span className="w-[18%] flex items-center justify-center text-[calc(1rem+1vw)] sm:text-[24px] text-[#b9bab5] relative">
          <HiUser />
          <p className="absolute top-[-50%] text-[calc(0.8rem+1vw)] sm:text-[18px] right-[10%]">{seats || 0}</p>
        </span>
      </div>
      <div className="h-[64.7%]">
        <Image
          src={vehicleCover.replace("/revision/latest/scale-to-width-down/210","/revision/latest/scale-to-width-down/320")}
          className="h-full"
          alt=""
          width={322}
          height={176}
        />
      </div>
      <div className="h-[14.7%] bg-black flex items-center pl-[8px] uppercase">
        <p className="flex-1">{vehicleName || "UNAVAILABLE"}</p>
        <span className="red-button h-[90%] sm:p-1 flex justify-center items-center self-end rounded-none shadow-inner shadow-[#9f171b] mr-[1px]">
          {vehiclePrice ? formatPrice(vehiclePrice) : "UNAVAILABLE"}
        </span>
      </div>
    </Link>
  );
}

export default VehicleButton;
