import Footer from "@/components/Footer/page";
import { HeaderClient } from "@/components/ui/headerclient";
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>
    
    <HeaderClient/>
    {children}
   <Footer></Footer>
    </div>;
}
