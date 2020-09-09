export default function BaseHeader() {
  return <> 
    <h1>The Base</h1>
    <style jsx>{`
      h1 {
        @apply mx-10 p-2 shadow-lg rounded bg-blue-900;
        color: white;
      }  
    `}</style>
  </>;
}
