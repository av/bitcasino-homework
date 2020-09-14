export default function CenteredSpinner() {
  return (
    <div>
      <style jsx>{`
        div {
          --size: 2rem;
          --width: calc(var(--size) * 0.2);

          height: var(--size);
          width: var(--size);
          position: relative;
          text-indent: -9999em;
          border-radius: 50%;
          border-top: var(--width) solid transparent;
          border-right: var(--width) solid transparent;
          border-bottom: var(--width) solid var(--purple-1000);
          border-left: var(--width) solid var(--purple-1000);
          animation: spinning 1s linear infinite;
        }

        @keyframes spinning {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
