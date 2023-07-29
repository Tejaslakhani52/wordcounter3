import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className="mt-[80px]">
        <Component {...pageProps} />
      </div>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Footer />
    </>
  );
}
