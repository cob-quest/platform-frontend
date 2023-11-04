import "./globals.css";
import { PT_Mono } from "next/font/google";

const ptMono = PT_Mono({ weight: "400", subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "cob",
  description: "cob",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ptMono.className}>
        <div className="container">
          <div className="menu">
            {/* <div> 
              cob
            </div> */}
            <div className="buttons-flex">
              <div className="button red"></div>
              <div className="button yellow"></div>
              <div className="button green"></div>
            </div>
          </div>
          
          <div id="app"> {children} </div>
        </div>
      </body>
    </html>
  );
}
