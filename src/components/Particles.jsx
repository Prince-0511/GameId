// "use client";
// import Particles from "react-tsparticles";
// import { loadSlim } from "tsparticles-slim";
// import { useCallback } from "react";

// const ParticlesBackground = () => {
//   const particlesInit = useCallback(async (engine) => {
//     await loadSlim(engine);
//   }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={{
//         fullScreen: {
//           enable: true,   // ✅ covers entire page
//           zIndex: -1,     // ✅ sends it behind your content
//         },
//         background: { color: "transparent" },
//         particles: {
//           number: { value: 80 },
//           color: { value: "#ffffff" },
//           shape: { type: "circle" },
//           opacity: { value: 0.5 },
//           size: { value: { min: 1, max: 3 } },
//           move: {
//             enable: true,
//             speed: 1,
//             direction: "none",
//             outModes: "out",
//           },
//         },
//         interactivity: {
//           events: {
//             onHover: { enable: true, mode: "repulse" },
//             onClick: { enable: true, mode: "push" },
//           },
//           modes: {
//             repulse: { distance: 100 },
//             push: { quantity: 4 },
//           },
//         },
//       }}
//     />
//   );
// };

// export default ParticlesBackground;
