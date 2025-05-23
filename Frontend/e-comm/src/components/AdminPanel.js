import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
    const name = localStorage.getItem("name") || "Admin";

    const images = [
        'https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437084.jpg?t=st=1746617616~exp=1746621216~hmac=60e6c523459a1d3ea79c9e32180b304f3890318c6f7edfb5d66a6d199ea90524&w=1380',
        'https://img.freepik.com/free-vector/realistic-3d-advert-with-smartphone_79603-1255.jpg',
        'https://static.vecteezy.com/system/resources/previews/008/353/529/non_2x/realistic-smartphone-mockup-presentation-template-clean-minimal-phone-ui-website-landing-page-style-background-with-copy-space-vector.jpg',
        'https://png.pngtree.com/thumb_back/fh260/background/20231002/pngtree-d-render-of-phone-and-twitter-logos-mockup-on-vibrant-green-image_13524782.png',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const styles = {
        container: {
            position: 'relative',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '80%',
            margin: '0 auto',
        },
        imageWrapper: {
            width: '100%',
            height: '470px', // Fixed height
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            marginTop:'10px'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
        },
        overlay: {
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '12px',
        },
        heading: {
            margin: '0',
            fontSize: '32px',
        },
        paragraph: {
            margin: '10px 0 0',
            fontSize: '18px',
        },
        dotsContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
        },
        dot: {
            height: '12px',
            width: '12px',
            margin: '0 5px',
            backgroundColor: '#bbb',
            borderRadius: '50%',
            display: 'inline-block',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        activeDot: {
            backgroundColor: '#333',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.imageWrapper}>
                <img 
                    src={images[currentIndex]} 
                    alt='Slider Image'
                    style={styles.image}
                />
                <div style={styles.overlay}>
                    <h1 style={styles.heading}>Admin Panel</h1>
                    <p style={styles.paragraph}>Welcome, {name}</p>
                </div>
            </div>

            {/* Dot Navigation */}
            <div style={styles.dotsContainer}>
                {images.map((_, index) => (
                    <span
                        key={index}
                        style={{
                            ...styles.dot,
                            ...(currentIndex === index ? styles.activeDot : {})
                        }}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
