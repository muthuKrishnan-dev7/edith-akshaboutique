import { IconArrowLeft, IconHome, IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-[100dvh] w-full items-center justify-center bg-gray-50 px-5 py-10">
      <section className="w-full max-w-2xl text-center">
        {/* Error Code */}
        <div className="select-none">
          <h1
            className="
              text-[clamp(7rem,22vw,15rem)]
              font-black
              leading-none
              tracking-[-0.06em]
              text-gray-200
            "
          >
            404
          </h1>
        </div>

        {/* Content */}
        <div className="relative -mt-6 sm:-mt-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-lg">
            <IconSearch size={28} stroke={1.8} />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Page Not Found
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
            Sorry, we couldn't find the page you're looking for. The URL may be
            incorrect, or the page may have been moved or removed.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/", { replace: true })}
              className="
                inline-flex w-full items-center justify-center gap-2
                rounded-xl border border-gray-300
                bg-white px-5 py-3
                text-sm font-semibold text-gray-700
                shadow-sm
                transition-all duration-200
                hover:border-gray-400
                hover:bg-gray-100
                hover:text-gray-900
                active:scale-[0.98]
                sm:w-auto
              "
            >
              <IconArrowLeft size={18} stroke={1.9} />
              Go Back
            </button>

            <button
              type="button"
              onClick={() => navigate("/", { replace: true })}
              className="
                inline-flex w-full items-center justify-center gap-2
                rounded-xl
                bg-gray-900 px-5 py-3
                text-sm font-semibold text-white
                shadow-sm
                transition-all duration-200
                hover:bg-gray-800
                active:scale-[0.98]
                sm:w-auto
              "
            >
              <IconHome size={18} stroke={1.9} />
              Back to Home
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
