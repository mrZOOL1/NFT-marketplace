import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const TooManyDecimals = function (text: string): boolean {

  if (text.includes('.')) {

    const index = text.indexOf(".");
    text = text.slice(index + 1);

    if (text.length <= 2) {
      return false;
    } else {
      return true;
    }

  } else {
    return false;
  }
}

export const ActionHandler = function (FormSelector: string, action: (FormData: FormData) => Promise<void>, mystartTransition: React.TransitionStartFunction): void {

  const form = document.querySelector(FormSelector) as HTMLFormElement;
  const allinputs = form.querySelectorAll('input');
  const formData = new FormData();
  for (let i = 0; i < allinputs.length; i++) {
    const input = allinputs[i];
    const name = input.name;
    const value = input.value;
    formData.append(name, value);
  }

  mystartTransition(async () => {

    try {
      await action(formData);
    } catch (error) {
      console.error(error);
    }

  });

}