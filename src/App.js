
export default function App() {
  return (
    <div className="app w-[100vw] h-[100vh] flex flex-row items-center justify-center bg-gray-800 cursor-default">
      <div className="app-content-container">
        <h1 className="leading-snug text-2xl text-white font-semibold">
          You're using a react+tailwindcss tempate
        </h1>
        <h3 className="leading-snug text-gray-500 font-normal">To create a react app using tailwindcss, remove the complete JSX from src/App.js</h3>
        <div className="mt-6" />
        <h4 className="leading-snug text-white font-semibold text-lg">
          Extra packages this template has already installed
        </h4>
        <div className="leading-snug w-fit h-fit gap-2 font-medium font-mono text-purple-700 cursor-default">
          react-router-dom, react-modal, react-icons, tailwindcss, react-tooltip
        </div>
        <div className="mt-12 font-normal">
          <p className="leading-snug text-gray-500 text-sm">
            Facing issues {"&"} problems with this template, report <a className="leading-snug text-blue-600 hover:underline" target="_blank" href="https://github.com/yashsehgal/react-tailwind-template/issues">here</a>
          </p>
          <p className="mt-2 leading-snug text-sm text-white">
            Made in love with purple, react and tailwindcss by <a href="https://yashsehgal.com" target="_blank" className="leading-snug text-blue-600 hover:underline">yashsehgal</a>
          </p>
        </div>
        <button className="mt-6 px-4 py-2 rounded-md bg-purple-600 text-white font-semibold flex flex-row items-center justify-center leading-snug lowercase hover:bg-blue-600 shadow-sm shadow-black"
          onClick={() => window.open('https://tailwindcss.com/')}
        >
          learn tailwindcss
        </button>
      </div>
    </div>
  )
}