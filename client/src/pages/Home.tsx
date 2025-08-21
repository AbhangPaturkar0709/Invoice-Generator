import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* ✅ Soft Glow Patch 1 (Bottom Left) */}
      <div
        className="absolute rounded-full blur-3xl z-0"
        style={{
          width: "clamp(150px, 20vw, 260px)",
          height: "clamp(150px, 22vw, 280px)",
          background: "#CCF575",
          opacity: 0.4,
          bottom: "5%",
          left: "-8%",
        }}
      />

      {/* ✅ Soft Glow Patch 2 (Top Middle) */}
      <div
        className="absolute rounded-full blur-3xl z-0"
        style={{
          width: "clamp(150px, 20vw, 260px)",
          height: "clamp(150px, 22vw, 280px)",
          background: "#CCF575",
          opacity: 0.40,
          top: "8%",
          left: "38%",
        }}
      />

      {/* ✅ Soft Glow Patch 3 (Top Right) */}
      <div
        className="absolute rounded-full blur-3xl z-0"
        style={{
          width: "clamp(150px, 22vw, 270px)",
          height: "clamp(150px, 22vw, 270px)",
          background: "#4F59A8",
          opacity: 0.8,
          top: "12%",
          right: "-8%",
        }}
      />

      {/* Example foreground text */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-white text-3xl md:text-5xl font-bold text-center px-4">
        <div className="flex flex-col gap-5">
        Invoice Generator - Task
        <Link
            to="/login"
            className="border-2 border-[#CCF575] text-[#CCF575] 
              hover:bg-[#CCF575]/10 
              px-2 py-1 text-xs font-medium rounded-sm 
              sm:px-3 sm:py-1.5 sm:text-sm 
              md:px-4 md:py-2 md:text-base 
              lg:px-5 lg:py-2 lg:text-lg 
              transition truncate"
          >
            Connecting People with Technology
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
