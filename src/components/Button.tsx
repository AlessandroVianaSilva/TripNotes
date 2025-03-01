import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ButtonProps = {
  type: "button" 
  ;
  title: string;
  icon?: string;
  variant: string;
  onClick?: (evento: any) => void
};

const Button = ({ type, title, icon, variant }: ButtonProps) => {
  const router = useRouter()


  return (
    <button className={`flex items-center justify-center gap-2 border rounded-full ${variant}`}>
      {icon && <Image src={icon} alt={title} width={20} height={20} />}
      <label className="whitespace-nowrap cursor-pointer text-[16px] font-[700]">{title}</label>
    </button>
  );
};

export default Button;