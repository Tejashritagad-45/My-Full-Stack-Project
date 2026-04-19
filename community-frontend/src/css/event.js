export const styles = {
 
  event:
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-3 md:p-6 lg:p-8 w-full max-w-7xl mx-auto",

  text:
    "flex flex-col items-center justify-center pt-6 md:pt-10 pb-4 md:pb-6 px-4 text-center gap-2",

  title:
    "text-lg md:text-xl font-bold text-gray-900 font-serif max-w-2xl leading-tight px-2",

  para:
    "text-gray-500 font-[merriweather] italic text-[11px] md:text-sm opacity-80",

  // 🔍 SEARCH
  searchContainer:
    "flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 px-4 w-full max-w-3xl mx-auto",

  input:
    "w-full sm:w-auto flex-1 px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm",

  search:
    "px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow hover:bg-indigo-700 transition-all duration-200 w-full sm:w-auto",

  // BUTTON
  createBtn:
    "block mx-auto mb-6 bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-bold py-2 px-6 rounded-xl font-[playfair_Display] shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 tracking-wide text-[10px] md:text-xs w-fit active:scale-95",

  // EVENT CARD
  eventContainer:
    "bg-white border border-gray-100 rounded-2xl p-4 md:p-5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col gap-2 relative overflow-hidden group w-full mx-auto",

  // TEXT
  name:
    "text-base md:text-lg font-bold text-gray-800 font-serif group-hover:text-indigo-600 transition-colors line-clamp-1",

  comName:
    "text-[8px] md:text-[9px] uppercase font-[merriweather] tracking-wide text-indigo-500 font-bold",

  city:
    "text-[9px] md:text-[10px] text-gray-500 font-medium flex items-center gap-1 font-[merriweather]",

  description:
    "text-[11px] md:text-xs text-gray-600 font-[merriweather] leading-relaxed line-clamp-3 my-1 min-h-[2.5em]",

  venue:
    "text-[9px] md:text-[10px] text-gray-700 font-semibold bg-indigo-50 p-1.5 rounded-md border border-indigo-100 line-clamp-1",

  time:
    "text-[9px] md:text-[10px] text-indigo-400 font-medium mt-auto border-t pt-2 border-gray-50",
};