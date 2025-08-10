export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800">
      <h1 className="text-5xl font-semibold text-blue-800 shadow-md mb-6">
        First nextjs app
      </h1>
      <p className="text-lg font-medium bg-white p-4 rounded-lg shadow-lg">
        Welcome to the Todo Display App! <br />
        Navigate to{" "}
        <code className="font-mono text-blue-600">localhost:3000/blogs</code> to
        view your todos.
      </p>
    </div>
  );
}
