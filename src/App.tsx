import React, {useCallback, useEffect, useRef, useState} from 'react'
import styles from './App.module.scss'
import airPlane from './static/images/airplane.png'
import ball from './static/images/ball.png'

const App=()=> {
  const [positionY,setPositionY] = useState<number>(50)
  const [positionX,setPositionX] = useState<number>(120)
  const fireRef = useRef(0)
  const keyDownRef = useRef(false)
  const nowTimeRef = useRef(Date.now())
  const lastTimeRef = useRef(Date.now())

  const delayRime = 300

  useEffect((() => {
    if (fireRef.current!==0){
      cancelAnimationFrame(fireRef.current)
      fireRef.current=0
    }
    (function animloop() {
      nowTimeRef.current = Date.now()
      if(nowTimeRef.current-lastTimeRef.current > delayRime){
        lastTimeRef.current = nowTimeRef.current
        fireBallFunc(positionX,positionY)
      }
      fireRef.current = requestAnimationFrame(animloop);
    })();

  }),[positionY,positionX])

  useEffect(()=>{
    const listener = (e:KeyboardEvent)=>{
      handleKeyDown(e.code)
    }
    if (!keyDownRef.current){
      document.addEventListener('keydown',listener)
      keyDownRef.current = true
    }
  },[])

  const handleKeyDown= (code:string)=>{
    switch (code) {
      case 'KeyW':
        setPositionY((v)=>{
          if (v>=480){
            return 480;
          } else {
            return v+10
          }
        });break;
      case 'KeyS':
        setPositionY((v)=>{
          if (v<=0){
            return 0;
          } else {
            return v-10
          }
        });
        break;
      case 'KeyA':
        setPositionX((v)=> {
          if (v<=0){
            return 0;
          } else {
            return v-10
          }
        });break;
      case 'KeyD':
        setPositionX((v)=>{
          if (v>=250){
            return 250;
          } else {
            return v+10
          }
        });break;
    }

  }

  const fireBallFunc = async (x:number,y:number)=>{
    const bgEle = document.getElementById('bg') as HTMLDivElement
    const imgEle = document.createElement('img')
    imgEle.classList.add(styles.ball)
    imgEle.src = ball
    imgEle.width = 10
    imgEle.style.left = `${x+32}px`
    let bottom =y+72
    imgEle.style.bottom = `${y+72}px`
    bgEle.appendChild(imgEle)

    const interval = setInterval(()=>{
      if (bottom>=510){
        clearInterval(interval)
        bgEle.removeChild(imgEle)
      }
      bottom = bottom+10
      imgEle.style.bottom = `${bottom}px`
    },100)
  }


  return (
    <div className={styles.stage}>
      <div className={styles.bg} id="bg">
        <h1>{positionY}</h1>
        <h1>{positionX}</h1>
        <img src={airPlane} style={{bottom:positionY >=0? positionY:0 ,left:positionX}}  width={70} className={styles.airPlane}/>
      </div>
    </div>
  )
}

export default App
