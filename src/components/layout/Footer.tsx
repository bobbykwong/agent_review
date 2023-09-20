import Link from "next/link";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { HorizontalLayout } from "./HorizontalLayout";

export function Footer() {
  return (
    // <div className="flex justify-center items-center py-4 bg-gray-100">
    //   <HorizontalLayout>
    //     <div className="flex justify-center items-center gap-8 h-full">
    //       <Link href="/legal" className="underline underline-offset-4">
    //         Legal
    //       </Link>
    //       contact@betteragents.sg
    //     </div>
    //   </HorizontalLayout>
    // </div>
    <div className="bg-gray-100 py-6">
      <HorizontalLayout>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-x-4 md:space-x-8 md:mb-0">
            <Link href="/legal" className="hover:underline mb-2 md:mb-0">
              Legal
            </Link>
            <Link href="/blog" className="hover:underline mb-2 md:mb-0">
              Blog
            </Link>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <a
              href="https://www.instagram.com/betteragentssg/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center space-x-1"
            >
              <FaInstagram />
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@betteragentssg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center space-x-1"
            >
              <FaTiktok />
              TikTok
            </a>
            <a
              href="mailto:contact@betteragents.sg"
              className="hover:underline"
            >
              contact@betteragents.sg
            </a>
          </div>
        </div>
      </HorizontalLayout>
    </div>
  );
}
