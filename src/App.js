import React , { useRef, useState, useEffect } from "react";
import { Canvas, useFrame} from "@react-three/fiber";
import { Text} from "@react-three/drei";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Skills from "./components/Skills"; // Example of a new component
import Experience from "./components/Experience"; // Another new component
import Education from "./components/Education"; 
import Projects from "./components/Projects";
import PropTypes from 'prop-types';


function RandomVelocity() {
  return Math.random() * 0.15 - 0.05;
}

const bounds ={ x: 10, y: 5};

function BallWithText({ position, color, label, onHit }) {
  const mesh = useRef();
  const velocity = useRef([RandomVelocity(), RandomVelocity()]);
  const navigate = useNavigate();

  const handleClick = () => {
    switch  (label) {
      case "Skills":
        navigate("/Skills");
        break;
      case "Experience":
        navigate("/Experience");
        break;
      case "Education":
        navigate("/Education");
        break;
      case "Projects":
        navigate("/Projects");
        break;
      default:
        break;
    }
  }

  

  useFrame(() => {
    // if (!mesh.current) return; 
    mesh.current.position.x += velocity.current[0];
    mesh.current.position.y += velocity.current[1];

   if(mesh.current.position.x > bounds.x || mesh.current.position.x < -bounds.x){
      velocity.current[0] *= -1;
    }

   if(mesh.current.position.y > bounds.y || mesh.current.position.y < -bounds.y){
      velocity.current[1] *= -1;
    }
  });

  return (
    <mesh ref={mesh} onClick={handleClick} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshLambertMaterial color={color} />

      {label && (
        <Text
        position={[0, 0.56, 0]}
          fontSize={0.25}
          color="black"
          anchorX="center"
          anchorY="middle"
          depthTest={false}
          renderOrder={1}
        >
          {label}
        </Text>
      )}
    </mesh>
  );
}

function MovingBall({ position, color }) {
  const mesh = useRef();
  const velocity = useRef([RandomVelocity(), RandomVelocity()]);

  useFrame(() => {
    mesh.current.position.x += velocity.current[0];
    mesh.current.position.y += velocity.current[1];

   if(mesh.current.position.x > bounds.x || mesh.current.position.x < -bounds.x){
      velocity.current[0] *= -1;
    }

   if(mesh.current.position.y > bounds.y || mesh.current.position.y < -bounds.y){
      velocity.current[1] *= -1;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
}



const MainCanvas = () => {
  const [aspectRatio, setAspectRatio] = useState(window.innerWidth / window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const cameraProps = {
    position: [0, 0, 50],
    zoom: 2,
    left: -aspectRatio * 10,
    right: aspectRatio * 10,
    top: 10,
    bottom: -10,
    near: 0.1,
    far: 1000,
  };


  return (
    <>
    {/* Intro and Instructions Section */}
    <div style={{ padding: '20px', backgroundColor: '#243642', textAlign: 'center', position: 'relative', zIndex: 1 , color:'white' }}>
        <h2>Hello,i am Shivangi and </h2>
        <h3>Welcome to my bubblified portfolio</h3>
        <p>Navigate through the portfolio by clicking on the moving bubbles. Each bubble represents a different section: Skills, Projects, Experience, and Education.</p>
        <p>How to Play:  click on any bubble to learn more about me!</p>
        <p>Swipe up to play!</p>
      </div>
      <Canvas
        orthographic
        camera={cameraProps}
        style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}
     >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Moving balls */}
        <MovingBall position={[1, 1, 0]} color="cyan" />
        <MovingBall position={[-1, 1, 0]} color="lightblue" />
        <MovingBall position={[0, 2, 0]} color="pink" />
        <MovingBall position={[2, 2, 0]} color="purple" />
        <MovingBall position={[-2, 2, 0]} color="orange" />
        <MovingBall position={[0, 3, 0]} color="yellow" />
        <MovingBall position={[1, 4, 0]} color="green" />
        <MovingBall position={[-1, 4, 0]} color="brown" />
        <MovingBall position={[0, 5, 0]} color="hotpink" />
        <MovingBall position={[2, 5, 0]} color="thistle" />
        <MovingBall position={[-2, 5, 0]} color="voilet" />



        {/* Balls with text */}
        <BallWithText position={[2, 1, 0]} color="darkmagenta" label="Skills" />
        <BallWithText position={[-2, 1, 0]} color="yellow" label="Experience" />
        <BallWithText position={[0, -1, 0]} color="blue" label="Education" />
        <BallWithText position={[2, -1, 0]} color="seagreen" label="Projects" />

        
        {/* Controls */}
        {/* <OrbitControls enableZoom={false} enablePan={true} enableRotate={true} /> */}
        <color attach="background" args={["#C4D7FF"]} />
      </Canvas>

     
     
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainCanvas />} />
        <Route path="/Skills" element={<Skills />} />
        <Route path="/Experience" element={<Experience/>} />
        <Route path="/Education" element={<Education />} />
        <Route path="/Projects" element={<Projects />} />
      </Routes>
    </Router>
  );
};

// Prop validation for MovingBall
MovingBall.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired
};

// Prop validation for BallWithText
BallWithText.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onHit: PropTypes.func.isRequired
};
export default App;