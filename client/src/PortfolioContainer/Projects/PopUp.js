import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { motion, useAnimation } from "framer-motion"
import './PopUp.css'

export default function PaginaNueva({project, closePopup}) {
  const enableScroll = () => {  
    window.onscroll = null;
    document.body.style.overflowY = 'scroll';
  }
  // framer motion
  const boxSlide = {
    hidden: { x: 0, opacity: 0, transition: { delay: 1 } },
    visible: { x: 0, opacity: 1, transition: { delay: 1 } },
  };
  const boxTelonL = {
    visible: { x: '-0.5%', opacity: 1,
      transition: { duration: 0.8, repeat: 1, repeatDelay: 0.5, repeatType: "reverse"}},
    hidden: { x: '-100%', opacity: 1 }
  };
  const boxTelonR = {
    visible: { x: '0%', opacity: 1,
      transition: { duration: 0.8, repeat: 1, repeatDelay: 0.5, repeatType: "reverse"}},
    hidden: { x: '100%', opacity: 1 }
  };
  const controlsSlide = useAnimation();
  const controlsTelon = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
      if (inView) {
        controlsSlide.start("visible");
        controlsTelon.start("visible");
      } else {
        controlsSlide.start("hidden");
        controlsTelon.start("hidden");
      }
  }, [controlsSlide, controlsTelon, inView]);
  const unMount = () => {
    enableScroll();
    closePopup(false);
  };
  return (
    <><motion.div className="telonR"
      animate={controlsTelon}
      initial="hidden"
      variants={boxTelonR}
    > </motion.div>
    <motion.div className="telonL"
      animate={controlsTelon}
      initial="hidden"
      variants={boxTelonL}
    ></motion.div>
    <div className="popupBackground">
        {closePopup && (
          <motion.div className="popup__container"
            ref={ref}
            key="popup__container"
            animate={controlsSlide}
            initial="hidden"
            variants={boxSlide}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}>
            <div className="popup__header">
              <div className="popup__header__bar">
                <button className="popup__header__bar__close" onClick={() => unMount()}>
                  <i className="material-icons">close</i>
                </button>
              </div>
            </div>
            {project.map((project) => {
              return (
                <section className="popup__content" key={project.card}>
                  <div className="popup__content__header">
                    <div className="popup__content__header__img"
                      style={{backgroundImage: `url(${project.images[0]})`}}>
                    </div>
                  </div>
                  <div className="popup__content__info__header">
                    <h1 className="popup__content__info__header__title">{project.name.toUpperCase()}</h1>
                  </div>
                  <div className="popup__content__info">
                    <p className="popup__content__info__text">{project.description}</p>
                    <div className="popup__content__info__img--center">
                      <img className="popup__content__info__img" src={project.images[1]} alt={project.title} />
                    </div>
                  </div>
                  <div className="popup__content__info popup__content__info--left">
                    <div className="popup__content__info__img--center">
                      <img className="popup__content__info__img" src={project.images[2]} alt={project.title} />
                    </div>
                    <p className="popup__content__info__text">{project.description[1]}</p>
                  </div>
                  <div className="popup__content__info popup__content__info--last">
                    <p className="popup__content__info__text popup__content__info__text--last">{project.description[2]}</p>
                    <div className="popup__content__info__img--center">
                      <img className="popup__content__info__img popup__content__info__img--last" src={project.images[3]} alt={project.title} />
                      <img className="popup__content__info__img popup__content__info__img--last" src={project.images[4]} alt={project.title} />
                    </div>
                  </div>
                </section>
              );
            })}
          </motion.div>
        )}
    </div></>
  );
}