import { shortList, list, longList } from "./data";
import { useState, useEffect} from "react";

import { FaQuoteRight } from 'react-icons/fa'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Carousel = () => {
    const [profile, setProfile] = useState(longList)
    const [currentProfile, setCurrentProfile] = useState(0)

    const prevSlide = () => {
        setCurrentProfile((oldPerson) => {
            const result = (oldPerson - 1 + profile.length) % [profile.length]
            return result
        })
    }

    const nextSlide = () => {
        setCurrentProfile((oldPerson) => {
            const result = (oldPerson + 1) % [profile.length]
            return result
        })
    }

    useEffect(() => {
       let sliderId = setInterval(() => {
            nextSlide()
        }, 5000);
        return () => clearInterval(sliderId)
    }, [currentProfile])

    return (
        <section className="slider-container">
            {profile.map((person, index) => {
                const { id, image, title, name, quote } = person
                console.log(person)
                return (
                    <article
                        key={id}
                        className="slide"
                        style={{
                            transform: `translateX(${100 * (index - currentProfile)}%)`,
                            opacity: index===currentProfile? 1 : 0,
                            visibility: index===currentProfile? 'visible' : 'hidden' 
                        }}
                    >
                        <img src={image} className="person-img" />
                        <h5 className="name">{name}</h5>
                        <p className="title">{title}</p>
                        <p className="text">{quote}</p>
                        <FaQuoteRight className="icon" />
                        <button type="button" className="prev" onClick={prevSlide}>
                            <FiChevronLeft />
                        </button>
                        <button type="button" className="next" onClick={nextSlide}>
                            <FiChevronRight />
                        </button>
                    </article>
                )
            })}


        </section>
    )
}
export default Carousel