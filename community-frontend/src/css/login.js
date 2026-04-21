export const styles = {
  
  authPage: "min-h-screen w-full flex flex-col lg:flex-row items-center justify-center p-4 md:p-8 lg:p-12 gap-8 lg:gap-12",

  content: "flex-1 max-w-xl text-center lg:text-left space-y-4 animate-in fade-in slide-in-from-left duration-700",

  headingLeft: "md:text-3xl lg:text-4xl font-extrabold text-slate-900 font-serif leading-tight tracking-tight",

  paragraph: "text-base text-slate-600 font-[merriweather] leading-relaxed",

  // 🔥 REDUCED HEIGHT HERE
  login: "flex-1 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-[2rem] p-6 md:p-7 w-full max-w-md border border-white flex flex-col gap-4 transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)]",

  form: "flex flex-col gap-4",
   gradientTop:
    "absolute bottom-0 left-0 w-72 h-72 bg-indigo-300 blur-3xl opacity-30 rounded-full",

  gradientBottom:
    "absolute bottom-0 right-0 w-72 h-72 bg-pink-300 blur-3xl opacity-30 rounded-full",

  title: "text-2xl font-black font-[playfair_Display] text-gray-900 tracking-tight leading-tight text-center",

  formContainer: "flex flex-col gap-1.5",

  label: "text-[10px] font-bold text-gray-500 font-serif tracking-[0.15em] ml-1",

  // 🔥 INPUT HEIGHT REDUCED
  input: "w-full px-4 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/10 outline-none transition-all duration-300 text-sm placeholder:text-gray-300 placeholder:italic",

  // 🔥 BUTTON HEIGHT REDUCED
  btn: "mt-2 w-60 ml-15 bg-gradient-to-r from-pink-600 to-rose-500 text-white font-bold font-[merriweather] py-2.5 rounded-xl hover:shadow-lg hover:shadow-pink-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 uppercase tracking-widest text-xs shadow-md",

  msg: "text-center text-xs font-[merriweather] text-gray-400  ",

  link: "text-pink-600 font-black hover:text-pink-700 transition-colors ml-1 underline decoration-2 underline-offset-4",

  successMsg: "text-center mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 py-1.5 rounded-lg animate-fade-in",

  errorMsg: "text-pink-500 text-[10px] font-bold mt-1 ml-2 italic",
  password:"text-end text-xs"
};