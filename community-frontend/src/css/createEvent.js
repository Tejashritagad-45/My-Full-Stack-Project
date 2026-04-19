export const styles = {
  // Added responsive background and centered content for all screen sizes
  form: "min-h-screen w-full flex flex-col lg:flex-row items-center justify-center p-4 md:p-10 lg:p-20 gap-8 lg:gap-12",
  
  // Adjusted text alignment for mobile vs desktop
  contentSection: "flex flex-col gap-4 w-full max-w-xl text-center lg:text-left mb-10 lg:mb-20",
  
  mainTitle: "text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 font-serif leading-tight",
  
  mainSubtitle: "text-md md:text-lg text-gray-500 font-[merriweather] leading-relaxed italic",

  // Form Container: Changed to 'w-[95%]' for mobile safety
  formContainer: "bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl p-6 md:p-8 w-[95%] max-w-md border border-gray-50 flex flex-col gap-4",
  
  title: "text-xl md:text-2xl font-bold text-gray-800 font-serif",
  
  subtitle: "text-[10px] md:text-xs text-gray-400 mb-2 md:mb-4 uppercase tracking-widest",

  // Grid Group: Kept as 2 columns, but ensured they fit on small screens
  gridGroup: "grid grid-cols-2 gap-3 md:gap-4",
  
  inputWrapper: "flex flex-col gap-1.5",

  label: "text-[10px] md:text-[11px] font-bold text-gray-800 font-[playfair_Display] uppercase tracking-wider ml-1",
  
  // Inputs: Added 'text-base' for mobile to prevent iOS auto-zoom
  name: "w-full px-4 py-2.5 font-[merriweather] rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all text-base md:text-sm bg-gray-50 placeholder:text-gray-300",
  
  description: "w-full px-4 py-2.5 font-[merriweather] rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all text-base md:text-sm bg-gray-50 min-h-[80px] resize-none",
  
  city: "w-full px-4 py-2.5 font-[merriweather] rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-400 outline-none text-base md:text-sm bg-gray-50",
  
  venue: "w-full px-4 py-2.5 font-[merriweather] rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-400 outline-none text-base md:text-sm bg-gray-50",
  
  capacity: "w-full px-4 py-2.5 font-[merriweather] rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-400 outline-none text-base md:text-sm bg-gray-50",
  
  time: "w-full px-4 py-2.5 font-[merriweather] rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-400 outline-none text-[10px] md:text-[11px] bg-gray-50",
  
  community: "w-full px-4 py-2.5 font-[merriweather] rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-400 outline-none text-base md:text-sm bg-gray-50 cursor-pointer",

  // Button: Keeps your tracking and style, fits mobile width
  btn: "mt-4 w-full bg-pink-600 text-white font-bold py-3.5 rounded-2xl font-[playfair_Display] shadow-lg shadow-pink-100 hover:bg-pink-700 hover:scale-[1.02] active:scale-95 transition-all duration-300 tracking-[0.2em] text-[10px] uppercase"
};