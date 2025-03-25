import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import About from '../assets/ipng.png'
import bioPC from '../assets/bio_pc.png'
import tech from '../assets/tech.png'
import hobby from '../assets/hobby.png'
import '../css/MyBioFolder.css'


function MyBioFolder() {

  const [generalTap, setGenerapTap] = useState(true)
  const [technologyTap, setTechnologyTap] = useState(false)
  const [hobbTap, setHobbTap] = useState(false)

  const { 
    themeDragBar,
    MybioExpand, setMybioExpand,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
   } = useContext(UseContext);

   const technologyText = ( // don't have to use DangerousHTML
    <>
        I mainly use <span>C++</span>, <span>C#</span> and <span>Java</span> 
        to create user-friendly software and projects, recently began learning <span>Swift</span> for a college class in IOS Development. 
        I've also worked on some personal videogames using the Game Engines: <span>Unreal Engine 5</span> and 
        <span>Unity</span>. I have some basic knowledge of <span>HTML</span> , <span>CSS</span> and <span>JavaScript</span> for web development. Of course, Including 
        <span>MySQL</span> by bringing together the front end and back end 
        for seamless applications.
    </>
  );

  const bioText = ( // don't have to use DangerousHTML
    <>
        <strong>Objective:</strong>
        <br />
        <span>Become a Programmer and </span>
        <span>Game Developer.</span>
        <br />
        <br />
        <strong>Information:</strong>
        <br />
        <span>Carlos Zabala</span>
        <br />
        <span>Programmer, Software,  Game  </span>
        <span>Developer</span>
        <br />
        <span>929-278-9741</span>
        <br />
        <br />
        <strong>Location: </strong>
        <br />
        <span>New York City, Queens</span>
        <br />
        <span>Open to work</span>
        <br />
        <span>On Site / Remote</span>
    </>
  );

  const hobbyText = ( // don't have to use DangerousHTML
    <>
        In my free time, besides programming and developing videogames. I enjoy collecting retro hardware. I have a small collection of systems,
        game consoles, and software. I also enjoy playing old games on these systems just like the early 2000's. And if it's not retro, I'm definetly practicing to run a 5k marathon or longer, collecting these medals feels like getting trophies on the PlayStation.
    </>
  );

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setMybioExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }


  function handleBiotap(name) {
    setGenerapTap(name === 'general');
    setTechnologyTap(name === 'technology');
    setHobbTap(name === 'hobby');
  }

  const activeBtnStyle = {
    bottom: '2px',
    outline: '1px dotted black',
    outlineOffset: '-5px',
    borderBottomColor: '#c5c4c4',
    zIndex: '3'
  };


  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={MybioExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 35 : 70,
          y: window.innerWidth <= 500 ? 35 : 40,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('About')}
      >
        <motion.div className='bio_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('About');
            }}
            style={ MybioExpand.expand ? inlineStyleExpand('About') : inlineStyle('About')}>
          <div className="folder_dragbar"
             style={{ background: MybioExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="bio_barname">
              <img src={About} alt="About" />
              <span>About</span>
            </div>
            <div className="bio_barbtn">
              <div onClick={ !isTouchDevice ? (e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('About')
              } : undefined
              }   
                onTouchEnd={(e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('About')
              }}
              onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash'></p>
              </div>

                <div>
                <p className='x'
                  onClick={!isTouchDevice ? () => {
                    deleteTap('About')
                    handleBiotap('general')
                  }: undefined}
                  onTouchEnd={() => {
                    deleteTap('About')
                    handleBiotap('general')
                  }}
                >×
                </p>
              </div>
            </div>
          </div>
          <div className="file_tap_container-bio">
          <p  onClick={() => handleBiotap('general')}
              style={generalTap ? activeBtnStyle : {}}
          >General
          </p>
          <p onClick={() => handleBiotap('technology')}
              style={technologyTap ? activeBtnStyle : {}}
          >Technology
          </p>
          <p onClick={() => handleBiotap('hobby')}
                  style={hobbTap ? activeBtnStyle : {}}
          >Hobby
          </p>
          </div>
          <div className="folder_content">
            <div className="folder_content-bio"
              style={{ display: generalTap ? 'grid' : 'block' }}
            >
            <img
              alt="bioPC"
              className={generalTap ? 'bio_img' : 'bio_img_other'}
              src={generalTap? bioPC : (technologyTap ? tech : hobby)}
            />
            <div
              className="biotext_container">

              <p className={generalTap? 'bio_text_1' : 'bio_text_1_other'}>
                {generalTap? bioText : technologyTap? technologyText : hobbyText}
              </p>   
            </div>
              
            </div>
            <div className="bio_btn_container">
              <div className="bio_btn_ok"
              onClick={!isTouchDevice ? () => {
                deleteTap('About')
                handleBiotap('general')
              } : undefined}
              onTouchEnd={() => {
                deleteTap('About')
                handleBiotap('general')
              }}
              >
                <span>
                  OK
                </span>
              </div>
              <div className="bio_btn_cancel"
              onClick={!isTouchDevice ? () => {
                deleteTap('About')
                handleBiotap('general')
              } : undefined}
              onTouchEnd={() => {
                deleteTap('About')
                handleBiotap('general')
              }}
              ><span>Cancel</span></div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </>
  )
}          

export default MyBioFolder
