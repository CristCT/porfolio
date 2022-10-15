import React, { useState, useEffect } from "react"
import emailjs from '@emailjs/browser'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import floatingAstronaut from '../../assets/ContactMe/Floating-Astronaut.webp'
import Modal from "./Modal"
import './ContactMe.css'

export default function ContactMe () {
    const [openPopup, setOpenPopup] = useState(false);
    const formInitialDetails = {
        name: '',
        email: '',
        message: ''
    }
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Enviar');
    const [status, setStatus] = useState('');

    const onFormUpdate = (e) => {
        setFormDetails({
            ...formDetails,
            [e.target.name]: e.target.value
        })
    }
    const sendEmail = (e) => {
        e.preventDefault();
        setButtonText('Enviando...');
        setStatus('');

        emailjs.sendForm('service_tur9yz5', 'template_r5r8vue', e.target, 'oYjZZ5Vzt2fpp3WSj')
            .then((result) => {
                setStatus('Enviado');
                setButtonText('Enviar');
                setFormDetails(formInitialDetails);
                setOpenPopup(true)
            }, (error) => {
                setStatus('Error');
                setButtonText('Enviar');
                setOpenPopup(true)
            });
    }

    // framer motion
    const boxVariants = {
        // move from left to right
        hidden: { x: "-50%", opacity: 1 },
        visible: { x: 0, opacity: 1, transition: { duration: 1 } }
    };
    const controls = useAnimation();
    const [ref, inView] = useInView();
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);
    
    return (
        <div className='contact-me-container' id='Contactame'>
            <motion.div className='box'
                ref={ref}
                variants={boxVariants}
                initial="hidden"
                animate={controls}
                >
                <div className="square" style={{'--i':0}}></div>
                <div className="square" style={{'--i':1}}></div>
                <div className="square" style={{'--i':2}}></div>
                <div className="square" style={{'--i':3}}></div>
                {/* use grid for image and form */}
                <div className="contact-me-grid">
                    <div className="contact-me-image">
                        <img className="imageclass" src={floatingAstronaut} alt="floating astronaut" />
                    </div>
                    <div className="contact-me-form">
                        <div className="contact-me-text"><h1 className="contactme-title">Contactame</h1></div>
                        <form onSubmit={sendEmail}>
                            <label className="label-Contactme-Form">Nombre</label>
                            <input className="input-Contactme-Form" type="text" name="name" value={formDetails.name} onChange={onFormUpdate} required />
                            <label className="label-Contactme-Form">Email</label>
                            <input className="input-Contactme-Form" type="email" name="email" value={formDetails.email} onChange={onFormUpdate} required />
                            <label className="label-Contactme-Form">Mensaje</label>
                            <textarea className="input-Contactme-Form textarea" name="message" value={formDetails.message} onChange={onFormUpdate} required />
                            <button
                                className="glow-on-hover"
                                type="submit"
                                disabled={buttonText === 'Enviando...' ? true : false}
                                onClick={() => {setStatus('');}} // clean status message
                                >{buttonText}
                            </button>
                            {openPopup && <Modal closePopup={setOpenPopup} statusMessage={status} />}
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}