const tailwindStyles = {
    flexCenter: "flex items-center justify-center",
    flexBetween: "flex items-center justify-between",
    flexStart: "flex items-start justify-start flex-col",
    flexEnd: "flex items-end justify-end",
    transformCenter: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    gridCenter: "grid place-items-center",
    fullSize: "w-full h-full",
    textCenter: "text-center",
    xAxisCenter: "absolute left-1/2 transform -translate-x-1/2",
    container: "container mx-auto px-4",
    roundedFull: "rounded-full",
    shadow: "shadow-md",
    transition: "transition duration-300 ease-in-out",
    buttonPrimary: "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600",
    buttonSecondary: "bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600",
    auth: {
        form: "flex items-start justify-start flex-col gap-2",
        label: "text-2xl",
        input: "w-full h-12 bg-gray-300 min-w-80 my-[.625em] outline-none rounded-[.625rem] px-2 border border-transparent focus:ring-[3px] focus:ring-gray-400 text-[1.257rem] placeholder:text-[1.257rem] placeholder:font-medium transition-all",
        button: "transition duration-400 min-w-80 mt-4 my-2 tracking-wide border-none text-[1.257rem] font-medium py-2 px-4 rounded w-full text-gray-600 bg-[#95D9DA] hover:bg-[#68c8ca] cursor-pointer",
    }
};

export { tailwindStyles };
