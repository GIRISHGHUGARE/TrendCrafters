import React from 'react';
import videoSrc from '../videos/Video.mp4'; 

const Home = () => {
  return (
    <div className="hero-section position-relative" style={{ height: '100vh' }}>
      <video
        autoPlay
        loop
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: -1
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content d-flex justify-content-center align-items-center h-100">
        {/* Content */}
        <h1 className="text-white text-center"></h1>
      </div>
    </div>
  );
}

export default Home;
