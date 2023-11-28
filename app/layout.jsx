import "@styles/globals.css";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";

export const metadata = {
  title: "Prompt Craft",
  description: "Discover & share AI prompts",
};

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <Provider>
        <div className="main">
          <div className="gradiant" />
        </div>
        <main className="app"> 
        <Navbar/>
         {children}
         </main>
         </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
