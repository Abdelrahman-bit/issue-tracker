
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-600 p-10 space-y-5">
      <h1 className=" text-4xl pb-5">Welcome to Issue Tracker Application</h1>
      <p>Your one-stop solution for managing issues efficiently.</p>
      <p>Sign in to your account to access all features.</p>
      <p>Happy tracking!</p>
      <a href="/issues" className="btn btn-accent w-3xs">View Issues ➡ </a>
    </div>
  );
}
