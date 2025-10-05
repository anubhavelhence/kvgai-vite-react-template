import { isValidElement } from "react";

/**
 * Checks if a value is a React component or element.
 *
 * @param value - The value to check
 * @returns True if the value is a React component or element, false otherwise
 */
export function isReactComponent(value: unknown): boolean {
    return isValidElement(value) || typeof value === "function";
}
