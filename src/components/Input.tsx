import { classed } from "lib/utils";
import { InputHTMLAttributes, forwardRef, MutableRefObject } from "react";

/**
 * Alongside the default input attributes,
 * adds the mandatory label to be notched when input is focused.
 */
type InputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * A wrapper around input
 * with a floating label.
 * 
 * Floating label is implemented using a <fieldset>
 * and an invisible text with the same exact content
 * as a floating label.
 * 
 * Notching is performed by transitioning the label
 * based on the :placeholder-shown pseudo-class.
 */
function Input(
  { label, className, ...rest }: InputProps,
  ref: MutableRefObject<HTMLInputElement>
) {
  return (
    <>
      <div className={classed("input", className)}>
        <input
          {...rest}
          ref={ref}
          className="block w-full font-bold bg-transparent"
          placeholder={label}
        />
        {label && (
          <fieldset className="absolute inset-0 border rounded transition-all duration-200 pointer-events-none">
            <legend>
              <span className="inline-block uppercase invisible whitespace-no-wrap transition-all duration-300">
                {label}
              </span>
            </legend>
          </fieldset>
        )}
        {label && (
          <label className="absolute transform origin-left -translate-y-1/2 text-gray-500 uppercase transition-all duration-200 pointer-events-none">
            {label}
          </label>
        )}
      </div>
      <style jsx>{`
        .input {
          position: relative;
          font-size: 0.9em;

          --padding: 1em;
        }

        .input fieldset {
          top: -0.8rem;
          padding: 0 calc(var(--padding) * 0.5);
        }

        .input label {
          position: absolute;
          top: 50%;
          left: var(--padding);
        }

        .input legend span {
          max-width: 0.01px;
          font-size: 0.65em;
        }

        .input input {
          padding: calc(var(--padding) * 0.8) var(--padding);
        }

        .input input::placeholder {
          color: transparent;
          display: none;
        }

        .input input:focus {
          outline: none;
        }

        /* Border transition */
        .input input:not(:placeholder-shown) + fieldset span,
        .input input:focus + fieldset span {
          max-width: 500px;
        }

        /* Label transition */
        .input input:not(:placeholder-shown) + fieldset + label,
        .input input:focus + fieldset + label {
          transform: translateY(-2.1rem) scale(0.6);
        }

        .input input:focus + fieldset {
          border-color: var(--orange-500);
        }
      `}</style>
    </>
  );
}

export default forwardRef(Input);
