export const styles = {

  // 🌈 MAIN CONTAINER (NO full gradient, only clean white)
  container1:
    "relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-5 overflow-hidden",

  // ✨ GRADIENT BLOBS (side + bottom only)
  gradientTop:
    "absolute top-0 left-0 w-72 h-72 bg-indigo-300 blur-3xl opacity-30 rounded-full",

  gradientBottom:
    "absolute bottom-0 right-0 w-72 h-72 bg-pink-300 blur-3xl opacity-30 rounded-full",

  // 🧠 CONTENT SECTION
  contentSection:
    "max-w-xl text-center md:text-left ml-20 mb-10 space-y-6 z-10",

  // 🔥 TITLE
  mainTitle:
    "text-4xl sm:text-5xl md:text-4xl font-extrabold font-[serif] leading-tight bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text",

  // 📝 SUBTITLE
  mainSubtitle:
    "text-gray-600 text-base md:text-lg leading-relaxed",

  // ✨ TAG LINE ROW
  taglineRow:
    "mt-6 flex items-center gap-4 justify-center md:justify-start",

  line:
    "h-[1px] w-20 bg-indigo-500",

  tagline:
    "text-xs uppercase tracking-widest text-indigo-600 font-bold",

  // 🎯 BUTTONS
  buttonGroup:
    "mt-6 flex gap-4 justify-center md:justify-start",

  primaryBtn:
    "px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition",

  secondaryBtn:
    "px-6 py-3 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100 hover:scale-105 transition",

  // 📸 IMAGE SECTION
  imageWrapper:
    "relative md:mt-0 mr-15 z-10 flex justify-center",

  image:
    "w-[260px] sm:w-[320px] md:w-[420px] lg:w-[500px]   rounded-2xl shadow-2xl object-cover hover:scale-105 transition duration-500",

  overlay:
    "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl",
};