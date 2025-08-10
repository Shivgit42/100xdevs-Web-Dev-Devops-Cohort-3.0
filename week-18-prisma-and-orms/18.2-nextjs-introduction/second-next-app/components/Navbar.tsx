import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto py-4">
        <ul className="flex justify-center items-center text-xl font-medium text-shadow-2xs ">
          <li className="flex space-x-6">
            <Link
              className="hover:text-gray-300 transition-colors duration-300"
              href={"/home"}
            >
              Home
            </Link>
            <Link
              className="hover:text-gray-300 transition-colors duration-300"
              href={"/home"}
            >
              About
            </Link>
            <Link
              className="hover:text-gray-300 transition-colors duration-300"
              href={"/home"}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
