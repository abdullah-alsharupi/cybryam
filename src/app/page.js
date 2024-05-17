import Image from "next/image";
import "./page.module.css";
export default function Home() {
  return (
    <div className="containershop" style={{display:"flex", alignItems:"center", marginLeft:"100px", marginRight:"100px"}}>
  <div className="col" style={{flex:"1", display:"flex", flexDirection:"column"}}>
    <h1 className="title" style={{fontSize:"60px",
      background: "linear-gradient(to bottom,var(--Color-primary),var(--Color-seconday))",
       backgroundClip:"text", color:"#63FFA5"}}>YOUR BEST ONLINE SHOP DESTINATION </h1>
    <p className="description" style={{fontSize:"24px", lineHeight:"2rem"}}>Discover a world of endless shopping possibilities at our online store. Browse and choose.</p>
    <button className="buttonShop" style={{cursor:"pointer", backgroundColor:"#63FFA5", border:"none",
     fontWeight:"bold", width:"150px",height:"40px", borderRadius:"2px"}}>Shop Now</button>
  </div>
  <div className="col" style={{flex:"1", display:"flex", flexDirection:"column", width:"100%", marginLeft:"100px", marginRight:"100px"}}>
    <Image src={"/hero.svg"} alt="The hero image" width={500} height={500}  />
  </div>
</div>
    
  );
}
