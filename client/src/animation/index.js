export const buttonClick = {
    whileTap: {scale: 0.95},
}

export const fadeInOut = {
    
    initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
}

export const sildeTop = {
    
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 30, opacity: 0 },
}

export const sildeIn = {
    initial: { x: 30, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 30, opacity: 0 },
}

export const staggerFadeInOut = (i) => {
    return {
        initial: { opacity: 0 , y: 50},
        animate: { opacity: 1 , y: 0},
        exit: { opacity: 0 , y: 50},
        transition: {
            duration: 0.3,
            delay: i * 0.15
        },
        key: {i},
    }
}