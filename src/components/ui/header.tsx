interface HeaderProps{
    // label?:String;
    // onClick?:()=>void;
    // disabled?:boolean
    // className?:String;
    // type?:"submit" | "reset" | "button"|undefined
    children?:any
  

}

const Header:React.FC<HeaderProps>=({children})=>{
return(
    <div className="rounded-tr-xl rounded-tl-xl  border-solid mb-[10px] sticky top-0   bg-[#222F66]">
        <h1 className="text-white text-center justify-items-center   font-serif font-bold text-[20px] items-center">
      {children}
        </h1>
      </div>
)
}

export default Header;
