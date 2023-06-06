import { Link } from "react-router-dom";

function FourOhFour() {
  return (
    <main className="grid h-screen place-items-center">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">PAGE NOT FOUND</h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go Back Home &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}

export default FourOhFour;
