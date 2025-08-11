import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 to-black-300 text-gray-100">
      <div className="bg-gray-900 text-center shadow-lg rounded-lg p-10 w-96">
        <h1 className="text-3xl font-bold text-white mb-6">Todo Application</h1>
        <p className="text-gray-300 mb-8">Manage your task with ease</p>

        <div className="space-y-6">
          <Link
            className="block w-full text-center text-md bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md py-3 transition-all duration-300 transform hover:scale-105"
            href={"/signin"}
          >
            Signin
          </Link>
          <Link
            className="block w-full text-center text-md bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md py-3 transition-all duration-300 transform hover:scale-105"
            href={"/signup"}
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
