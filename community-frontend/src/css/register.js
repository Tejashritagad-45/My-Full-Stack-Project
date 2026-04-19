export const styles = {

  container: "min-h-screen w-full flex flex-col lg:flex-row items-center justify-center bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-rose-50 via-slate-50 to-indigo-50 p-3 md:p-6 lg:p-12 gap-6 lg:gap-10 overflow-x-hidden",

  content: "flex-1 max-w-xl text-center lg:text-left space-y-4 md:space-y-5 animate-in fade-in slide-in-from-left duration-700",

  headingLeft: "text-3xl md:text-3xl lg:text-4xl font-extrabold mb-3 text-slate-900 font-serif leading-[1.1] tracking-tight px-2 lg:px-0",
   gradientTop:
    "absolute bottom-0 left-0 w-72 h-72 bg-indigo-300 blur-3xl opacity-30 rounded-full",

  gradientBottom:
    "absolute bottom-0 right-0 w-72 h-72 bg-pink-300 blur-3xl opacity-30 rounded-full",

  paragraph: "text-sm md:text-base lg:text-lg text-slate-600 font-[merriweather] leading-relaxed max-w-lg mx-auto lg:mx-0",

  // 🔥 REDUCED HEIGHT
  registerForm: "flex-1 bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[1.5rem] p-5 md:p-6 w-[95%] sm:w-full max-w-md flex flex-col gap-3 border border-white/40 mb-6 lg:mb-0",

  heading: "text-lg md:text-xl font-bold text-slate-800 mb-0.5 font-serif text-center tracking-tight",

  label: "block text-[9px] md:text-[11px] font-bold text-slate-500 font-serif tracking-[0.15em] mb-0.5 ml-1",

  // 🔥 INPUT HEIGHT REDUCED
  inputField: "w-full px-3 py-2 font-[merriweather] rounded-lg border border-slate-200 focus:ring-2 focus:ring-rose-500/10 focus:border-rose-400 focus:bg-white outline-none transition-all duration-300 bg-white/50 text-sm text-slate-800 placeholder:text-slate-400 placeholder:font-light",

  // 🔥 BUTTON HEIGHT REDUCED
  btn: "mt-1 w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-2.5 rounded-lg font-[merriweather] shadow-md shadow-rose-200 hover:shadow-rose-300 hover:scale-[1.02] active:scale-95 transition-all duration-300 tracking-[0.12em] text-[10px] uppercase",

  para: "text-center text-slate-500 mt-1 font-[merriweather] text-xs",

  link: "text-rose-600 font-bold hover:text-rose-700 transition-colors underline underline-offset-4 decoration-rose-200 hover:decoration-rose-500",

  message: "text-center mt-1 text-xs font-semibold text-rose-700 bg-rose-50 py-1 rounded-lg animate-pulse mx-2",

  errorText: "text-rose-500 text-[9px] font-medium mt-0.5 ml-2"
};