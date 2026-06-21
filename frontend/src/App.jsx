import { Routes, Route, NavLink } from "react-router-dom";
import Components from "./pages/Components";
import CycleBuilder from "./pages/CycleBuilder";
import PriceCalculator from "./pages/PriceCalculator";

export default function App() {
  return (
    <>
      <nav className="h-16 bg-gray-800 shadow flex justify-center items-center gap-6 md:gap-12 px-4 text-sm md:text-base">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-bold text-white" : "text-gray-400 hover:text-white"
          }
        >
          Components
        </NavLink>
        <NavLink
          to="/builder"
          className={({ isActive }) =>
            isActive ? "font-bold text-white" : "text-gray-400 hover:text-white"
          }
        >
          Builder
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            isActive ? "font-bold text-white" : "text-gray-400 hover:text-white"
          }
        >
          Pricing
        </NavLink>
      </nav>

      <main className="min-h-screen bg-gray-100 px-4 md:px-14 py-8">
        <Routes>
          <Route path="/" element={<Components />} />
          <Route path="/builder" element={<CycleBuilder />} />
          <Route path="/pricing" element={<PriceCalculator />} />
        </Routes>
      </main>
    </>
  );
}
// import { Routes, Route, NavLink } from "react-router-dom";
// import Components from "./pages/Components";
// import CycleBuilder from "./pages/CycleBuilder";
// import PriceCalculator from "./pages/PriceCalculator";

// const routes = [
//   { path: "/", label: "Components", element: <Components /> },
//   { path: "/builder", label: "Builder", element: <CycleBuilder /> },
//   { path: "/pricing", label: "Pricing", element: <PriceCalculator /> },
// ];

// function App() {
//   return (
//     <main className="p-6">
//       <nav className="flex gap-6 mb-8">
//         {routes.map(({ path, label }) => (
//           <NavLink key={path} to={path}>
//             {label}
//           </NavLink>
//         ))}
//       </nav>

//       <Routes>
//         {routes.map(({ path, element }) => (
//           <Route key={path} path={path} element={element} />
//         ))}
//       </Routes>
//     </main>
//   );
// }

// export default App;
