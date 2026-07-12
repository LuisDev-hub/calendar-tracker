import { createContext, ReactNode, useContext, useState } from "react";

type Lang = "en" | "es";
interface CalendarContextInterface {
    lang: Lang;
    setLang: (value: Lang) => void;
    getArrayLang: <T>(value: Record<Lang, T[]>) => T[];
}
const CalendarContext = createContext<CalendarContextInterface | undefined>(undefined)

type ProviderDefaults = {
    lang: Lang;
}
interface ProviderProps extends ProviderDefaults {
    children: ReactNode,
}
export const CalendarProvider = ({ children, ...defaultProps }: ProviderProps) => {
    const [lang, setLang] = useState<Lang>(defaultProps.lang);

    const getArrayLang = <T,>(obj: Record<Lang, T[]>) => {
        return obj[lang];
    }
    
    return (
        <CalendarContext.Provider value={{
            lang,
            setLang,
            getArrayLang
        }}>
            {children}
        </CalendarContext.Provider>
    )
}

export const useCalenContext = () => {
    const context = useContext(CalendarContext);
    if(!context)
        throw new Error("useCalenContext must be used with a CalendarProvider");
    return context;
}