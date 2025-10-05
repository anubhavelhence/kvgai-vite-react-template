Manual Installation
If you prefer to add Untitled UI to an existing Vite project, you can follow these steps:

1
Install packages

Simply install the required packages with your favorite package manager:

npm

npm install @untitledui/icons react-aria-components tailwindcss @tailwindcss/vite tailwindcss-react-aria-components tailwind-merge tailwindcss-animate

2
Configure Vite

Update your vite.config.ts (or vite.config.js) file to include the Tailwind CSS plugin and set up path aliases:

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
 
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});

This configuration does two important things:

Adds the Tailwind CSS Vite plugin for efficient processing
Sets up the @/ path alias to point to your src directory
Note that for TypeScript projects, you'll also need to update your tsconfig.json with the path aliases.

3
Update TypeScript Configuration (for TS projects)

If you're using TypeScript, update your tsconfig.json to include the path alias:

{
  "compilerOptions": {
    // other options...
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

4
Create a custom Tailwind CSS configuration

Create a theme.css file in your styles directory and add the following code:

<already placed>


5
Extend Tailwind CSS config

Now, in your globals.css file, import the theme.css and necessary plugins:

@import "tailwindcss";
@import "./theme.css";
 
@plugin "tailwindcss-animate";
@plugin "tailwindcss-react-aria-components";
 
@custom-variant dark (&:where(.dark-mode, .dark-mode *));
@custom-variant label (& [data-label]);
@custom-variant focus-input-within (&:has(input:focus));
 
@utility scrollbar-hide {
    /* For Webkit-based browsers (Chrome, Safari and Opera) */
    &::-webkit-scrollbar {
        display: none;
        -webkit-appearance: none;
    }
 
    /* For IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
 
@utility transition-inherit-all {
    transition-property: inherit;
    transition-duration: inherit;
    transition-timing-function: inherit;
}
 
html,
body {
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-variant-ligatures: contextual;
    font-variant-ligatures: contextual;
    -webkit-font-kerning: normal;
    font-kerning: normal;
}
 
/* Hide the default expand arrow on Safari.  */
details summary::-webkit-details-marker {
    display: none;
}
 
/* Hide default arrows from number inputs. */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
 
/* Hide the default clear button (X) from search inputs. */
input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
}

Show more

6
Add utility functions

In order to make the development experience slightly better we have added a few utility functions which we'll use throughout our project. Create these files under utils and hooks directories.

utils/cx.ts
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
    extend: {
        theme: {
            text: ["display-xs", "display-sm", "display-md", "display-lg", "display-xl", "display-2xl"],
        },
    },
});

/**
 * This function is a wrapper around the twMerge function.
 * It is used to merge the classes inside style objects.
 */
export const cx = twMerge;

/**
 * This function does nothing besides helping us to be able to
 * sort the classes inside style objects which is not supported
 * by the Tailwind IntelliSense by default.
 */
export function sortCx<T extends Record<string, string | number | Record<string, string | number | Record<string, string | number>>>>(classes: T): T {
    return classes;
}

utils/is-react-component.ts

import { useEffect, useState } from "react";

const screens = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
};

/**
 * Checks whether a particular Tailwind CSS viewport size applies.
 *
 * @param size The size to check, which must either be included in Tailwind CSS's
 * list of default screen sizes, or added to the Tailwind CSS config file.
 *
 * @returns A boolean indicating whether the viewport size applies.
 */
export const useBreakpoint = (size: "sm" | "md" | "lg" | "xl" | "2xl") => {
    const [matches, setMatches] = useState(typeof window !== "undefined" ? window.matchMedia(`(min-width: ${screens[size]})`).matches : true);

    useEffect(() => {
        const breakpoint = window.matchMedia(`(min-width: ${screens[size]})`);

        setMatches(breakpoint.matches);

        const handleChange = (value: MediaQueryListEvent) => setMatches(value.matches);

        breakpoint.addEventListener("change", handleChange);
        return () => breakpoint.removeEventListener("change", handleChange);
    }, [size]);

    return matches;
};


hooks/use-breakpoint.ts

import { useEffect, useState } from "react";

const screens = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
};

/**
 * Checks whether a particular Tailwind CSS viewport size applies.
 *
 * @param size The size to check, which must either be included in Tailwind CSS's
 * list of default screen sizes, or added to the Tailwind CSS config file.
 *
 * @returns A boolean indicating whether the viewport size applies.
 */
export const useBreakpoint = (size: "sm" | "md" | "lg" | "xl" | "2xl") => {
    const [matches, setMatches] = useState(typeof window !== "undefined" ? window.matchMedia(`(min-width: ${screens[size]})`).matches : true);

    useEffect(() => {
        const breakpoint = window.matchMedia(`(min-width: ${screens[size]})`);

        setMatches(breakpoint.matches);

        const handleChange = (value: MediaQueryListEvent) => setMatches(value.matches);

        breakpoint.addEventListener("change", handleChange);
        return () => breakpoint.removeEventListener("change", handleChange);
    }, [size]);

    return matches;
};

hooks/use-clipboard.ts

import { useCallback, useState } from "react";

const DEFAULT_TIMEOUT = 2000;

type UseClipboardReturnType = {
    /**
     * The state indicating whether the text has been copied.
     * If a string is provided, it will be used as the identifier for the copied state.
     */
    copied: string | boolean;
    /**
     * Function to copy text to the clipboard using the modern clipboard API.
     * Falls back to the fallback function if the modern API fails.
     *
     * @param {string} text - The text to be copied.
     * @param {string} [id] - Optional identifier to set the copied state.
     * @returns {Promise<Object>} - A promise that resolves to an object containing:
     *  - `success` (boolean): Whether the copy operation was successful.
     *  - `error` (Error | undefined): The error object if the copy operation failed.
     */
    copy: (text: string, id?: string) => Promise<{ success: boolean; error?: Error }>;
};

/**
 * Custom hook to copy text to the clipboard.
 *
 * @returns {UseClipboardReturnType} - An object containing the copied state and the copy function.
 */
export const useClipboard = (): UseClipboardReturnType => {
    const [copied, setCopied] = useState<string | boolean>(false);

    // Fallback function for older browsers
    const fallback = (text: string, id?: string) => {
        try {
            // Textarea to copy the text to the clipboard
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "absolute";
            textArea.style.left = "-99999px";

            document.body.appendChild(textArea);
            textArea.select();

            const success = document.execCommand("copy");
            textArea.remove();

            setCopied(id || true);
            setTimeout(() => setCopied(false), DEFAULT_TIMEOUT);

            return success ? { success: true } : { success: false, error: new Error("execCommand returned false") };
        } catch (err) {
            return {
                success: false,
                error: err instanceof Error ? err : new Error("Fallback copy failed"),
            };
        }
    };

    const copy = useCallback(async (text: string, id?: string) => {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);

                setCopied(id || true);
                setTimeout(() => setCopied(false), DEFAULT_TIMEOUT);

                return { success: true };
            } catch (err) {
                // If modern method fails, try fallback
                return fallback(text, id);
            }
        }
        return fallback(text);
    }, []);

    return { copied, copy };
};


7
Add a route provider

For client-side routing integration with React Aria components, create a RouteProvider component in providers/route-provider.tsx or in your desired location:

import { type PropsWithChildren } from "react";
import { RouterProvider } from "react-aria-components";
import { useHref, useNavigate } from "react-router-dom";
import type { NavigateOptions } from "react-router-dom";
 
declare module "react-aria-components" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}
 
export const RouteProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();
 
    return (
        <RouterProvider navigate={navigate} useHref={useHref}>
            {children}
        </RouterProvider>
    );
};
 
This `RouterProvider` uses `react-router-dom` for navigation. If you're using a different router such as TanStack Router, please refer to the [React Aria documentation](https://react-spectrum.adobe.com/react-aria/routing.html#tanstack-router) for integrating with different routers.

Show more

8
Add a theme provider

For dark mode support, add a ThemeProvider component in providers/theme-provider.tsx or in your desired location:

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
 
type Theme = "light" | "dark" | "system";
 
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}
 
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
 
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
 
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
 
    return context;
};
 
interface ThemeProviderProps {
    children: ReactNode;
    /**
     * The class to add to the root element when the theme is dark
     * @default "dark-mode"
     */
    darkModeClass?: string;
    /**
     * The default theme to use if no theme is stored in localStorage
     * @default "system"
     */
    defaultTheme?: Theme;
    /**
     * The key to use to store the theme in localStorage
     * @default "ui-theme"
     */
    storageKey?: string;
}
 
export const ThemeProvider = ({ children, defaultTheme = "system", storageKey = "ui-theme", darkModeClass = "dark-mode" }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem(storageKey) as Theme | null;
            return savedTheme || defaultTheme;
        }
        return defaultTheme;
    });
 
    useEffect(() => {
        const applyTheme = () => {
            const root = window.document.documentElement;
 
            if (theme === "system") {
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
 
                root.classList.toggle(darkModeClass, systemTheme === "dark");
                localStorage.removeItem(storageKey);
            } else {
                root.classList.toggle(darkModeClass, theme === "dark");
                localStorage.setItem(storageKey, theme);
            }
        };
 
        applyTheme();
 
        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
 
        const handleChange = () => {
            if (theme === "system") {
                applyTheme();
            }
        };
 
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);
 
    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

Show more

9
Update the main file

Update the main file in main.tsx to include the providers, the Inter font and the global styles:

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RouteProvider } from '@/providers/route-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import App from '@/App';
import '@/styles/globals.css';
 
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <RouteProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </RouteProvider>
        </BrowserRouter>
    </React.StrictMode>
);

10
Ready to go!

Great! You're all set to start using Untitled UI components.

Install landing page and set it as main
npx untitledui@latest example landing-pages/19

This requires login as it will be premium call.

If something is missing, you can copy/paste what you need into your project directly from individual components pages.

Need help? Check our GitHub repository for examples, or open an issue if you run into any problems. Our community is here to help!

Using Untitled UI components
After setting up the providers, you can use Untitled UI components throughout your application:

import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
 
export default function Home() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
 
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        
        console.log(name);
    };
 
    return (
        <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Welcome to Untitled UI + Vite</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <Input label="Name" name="name" placeholder="Enter your name" />
                <Button type="submit" className="mt-2">Submit</Button>
            </form>
        </main>
    );
}


Theme toggle
Create a toggle to switch between light and dark mode:

import { Button } from '@/components/base/buttons/button';
import { Moon01, Sun } from "@untitledui/icons";
import { useTheme } from '@/providers/theme-provider';
 
export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
 
    return (
            <Button
                aria-label="Toggle theme"
                color="tertiary"
                size="sm"
                iconLeading={theme === "light" ? Moon01 : Sun}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            />
    );
}