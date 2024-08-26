import React, { useRef, useState, useEffect } from 'react';
/////////////////////////////////////////////////////////////////////
import recordGif from './assets/gif/icons8-music-record.gif';
import s1_1 from './assets/section1/section1_1.jpg';
import s2_1 from './assets/section2/section2_1.jpeg';
import s2_2 from './assets/section2/section2_2.jpeg';
import s2_3 from './assets/section2/section2_3.jpg';
import s3_1 from './assets/section3/section3_1.jpg';
import s3_2 from './assets/section3/section3_2.jpg';
import s3_3 from './assets/section3/section3_3.jpg';
import s4_1 from './assets/section4/section4_1.jpg';
import explosion0 from './assets/sounds/explosion0.mp3'
import explosion1 from './assets/sounds/explosion1.mp3'
import explosion2 from './assets/sounds/explosion2.mp3'

/////////////////////////////////////////////////////////////////////
import { ToastContainer, toast } from 'react-toastify';
import { db } from './firebase/firebase';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebase/firebase"; 

import { Fireworks } from 'fireworks-js'

import Arrow from './components/arrow/arrow.jsx';


function App() {

  // Set up
  //////////////////////////////////////////////////////
  const videoRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const fireworksRef = useRef(null);


  const [wish, setWish] = useState('');
  const [videoUrl, setVideoUrl] = useState("");



  const gifStyle = {
    position: 'absolute',
    top: '10px',
    right: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  };

  useEffect(() => {
    console.log(wish);
  }, [wish]);
  
  useEffect(() => {
    const videoRef = ref(storage, "Happy Birthday combined.mp4");

    // Get the download URL
    getDownloadURL(videoRef)
      .then((url) => {
        setVideoUrl(url);
        console.log(url);
      })
      .catch((error) => {
        console.error("Error getting video URL:", error);
      });
  }, []);


  // Functions
  //////////////////////////////////////////////////////

  const handlePlayVideo =  () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play();
    }    

    toast('Make sure your volume is not muted');
  };

  const handleWishChange = (event) => {
    setWish(event.target.value);
  };

  const handleSubmitWish = async () => {

    if (wish.trim() === '') {
      toast.error("Wish cannot be empty.");
      return;
    }

    try {
      const ref = doc(collection(db, "wishes"));
  
      await setDoc(ref, {
        wish: wish,
        timestamp: new Date(),
      });
      toast.success("Your wish will come true very soon");
      setWish('');

      // Clear the previous fireworks instance
      if (fireworksRef.current) {
        fireworksRef.current.innerHTML = ''; 
      }

      const fireworks = new Fireworks(fireworksRef.current, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1.5,
        particles: 50,
        trace: 3,
        explosion: 5,
        brightness: { min: 50, max: 80 },
        sound: {
          enabled: true,
          files: [
            explosion0,
            explosion1,
            explosion2,
          ],
          volume: {
            min: 4,
            max: 35
          }
        }
      });
      fireworks.start();

      setTimeout(() => {
        fireworks.stop(); 
      }, 15000);
    } 
    catch (error) {
      toast.error(error.message);
    }
  };



  //scrolling behavior
  //////////////////////////////////////////////////////
  useEffect(() => {
    const sections = [section1Ref, section2Ref, section3Ref, section4Ref, section5Ref];
    let currentIndex = 0;
    let ableToScroll = true;

    const handleScroll = (event) => {

        const { deltaY } = event;

        if (currentIndex === sections.length - 1) {
          ableToScroll = false;
          document.body.style.overflow = 'auto'; // Enable scrollbar for Section 5
          window.removeEventListener('wheel', handleScroll);
          return;
        }

        if (ableToScroll) {
            // Scroll down
            if (deltaY > 1 && currentIndex < sections.length - 1) {   
                currentIndex++;
                window.scrollTo({
                    top: sections[currentIndex].current.offsetTop,
                    behavior: 'smooth',
               }); 
            } 
            // Scroll up
            else if (deltaY < -1 && currentIndex > 0) {
                currentIndex--;
                window.scrollTo({
                    top: sections[currentIndex].current.offsetTop,
                    behavior: 'smooth',
                });
            }

            console.log(`You are in section ${currentIndex + 1}`);

            ableToScroll = true;
            window.removeEventListener('wheel', handleScroll);

            setTimeout(() => {
                ableToScroll = true;
                console.log("Scroll re-enabled, ableToScroll:", ableToScroll);
                window.addEventListener('wheel', handleScroll);
            }, 1500); 
        }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('wheel', handleScroll);

    return () => {
        window.removeEventListener('wheel', handleScroll);
    };
}, []);
  
  










  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000}/>
      

      {/* <button onClick={() => scrollToSection(section2Ref)}>Go to Section 2</button> */}
      {/* <div>
        <h1>Scroll Detection</h1>
        <p>Scroll Method: {scrollMethod}</p>
        <p>Try scrolling using both a mouse and a touchpad!</p>
      </div> */}
     

      <div className="flex flex-col relative">
        {/* Section 1 */}
        <section id="section1" ref={section1Ref} className="h-screen bg-red-100 flex flex-col items-center justify-center relative">
          <img src={recordGif} alt="Music Record" style={gifStyle} />
          <h1 className="mt-4 text-4xl font-bold">
            This beautiful, elegant, and smart lady is turning 21 <br />
            <span className="block text-center mt-3">Look at how happy she is !!!</span>
          </h1>
          <img src={s1_1} alt="Section 1" className="rounded-2xl mt-5" style={{ width: '30%' }}/>
          <button
            onClick={handlePlayVideo}
            className="mt-2 bg-white bg-opacity-30 backdrop-blur-lg text-pink-400 text-lg font-semibold px-8 py-3 rounded-full shadow-xl hover:bg-opacity-40 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out border border-white"
          >
            Click to receive surprise
          </button>



          <Arrow color="#ff0000"/>
        </section>
        



        {/* Section 2 */}
        <section id="section2" ref={section2Ref} className="h-screen bg-yellow-100 flex flex-col items-center justify-center relative">
          <img src={recordGif} alt="Music Record" style={gifStyle} />
          <h1 className="text-4xl font-bold mb-8">Look at what you have accomplished</h1>
          <div className="flex flex-row justify-center space-x-4 mb-4">
            <img src={s2_1} alt="Accomplishment 1" className="rounded-lg w-1/4" />
            <img src={s2_2} alt="Accomplishment 2" className="rounded-lg w-1/4" />
            <img src={s2_3} alt="Accomplishment 3" className="rounded-lg w-1/4" />
          </div>
          <Arrow color="#ff0000"/>
        </section>



        {/* Section 3 */}
        <section id="section3" ref={section3Ref} className="h-screen bg-green-100 flex flex-col items-center justify-center relative">
          <img src={recordGif} alt="Music Record" style={gifStyle} />
          <h1 className="text-4xl font-bold mt-4">
            You have been to NY, MA, PA, FL, DC... <br />
            <span className="block text-center mt-4">The world is waiting for you to explore</span>
          </h1>
          <div className="flex flex-row justify-center space-x-4 mt-10">
            <img src={s3_1} alt="Travel 1" className="rounded-lg w-1/4" />
            <img src={s3_2} alt="Travel 2" className="rounded-lg w-1/4" />
            <img src={s3_3} alt="Travel 3" className="rounded-lg w-1/4" />
          </div>
          <Arrow color="#ff0000"/>
        </section>



        {/* Section 4 */}
        <section id="section4" ref={section4Ref} className="h-screen bg-black flex flex-col items-center justify-center relative">
          <div ref={fireworksRef} className="absolute inset-0 z-0"></div>
          <img src={recordGif} alt="Music Record" style={gifStyle} />
          <h1 className="text-blue-300 text-4xl font-bold mt-4">Happy Birthday To The Princess Celina Li !!!</h1>
          <img src={s4_1} alt="Section 4" className="rounded-2xl w-1/3 mt-10 z-10" />
          <input
            type="text"
            value={wish}
            onChange={handleWishChange}
            placeholder="Write down your wish"
            className="mt-8 p-2 border border-gray-300 rounded w-1/3 text-center z-10"
          />
          <button
            onClick={handleSubmitWish}
            className="mt-4 bg-pink-400 text-white text-base px-6 py-2 rounded-full hover:bg-pink-500 z-10"
          >
            Submit
          </button>
          <Arrow color="#ff0000"/>
        </section>



        {/* Section 5 */}
        <section id="section5" ref={section5Ref} className="h-screen bg-purple-100 flex flex-col items-center relative">
          <img src={recordGif} alt="Music Record" style={gifStyle} />
          <h1 className="text-4xl font-bold mt-20">Guess who is playing the background music?</h1>
          <video ref={videoRef} src={videoUrl} type="video/mp4" width="100%" height="auto" className="max-w-3xl mt-10" controls loop>
          </video>
        </section>
      </div>
    </>
  );
}

export default App;
