import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, introdatakor, meta, dataportfolio } from "../../content_option";
import { Link } from "react-router-dom";

// 이미지 비율을 계산하는 함수
function useImageRatio(src) {
  const [ratio, setRatio] = useState(16 / 9); // 기본값

  useEffect(() => {
    if (!src) return;
    const img = new window.Image();
    img.onload = () => {
      setRatio(img.width / img.height);
    };
    img.src = src;
  }, [src]);

  return ratio;
}

export const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const images = introdata.your_img_url;

  // Automatically change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  // Get top 3 portfolio items
  const topPortfolio = dataportfolio.slice(0, 3);

  const openModal = (item) => {
    setModalData(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div
            className="h_bg-image order-1 order-lg-2 h-100 "
            style={{ backgroundImage: `url(${introdata.your_img_url[currentImage]})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center">
              <div className="intro mx-auto">
                <h1 className="mb-1x">{introdata.title}</h1>
                <h2 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        `${introdata.animated.first}<br />${introdatakor.animated.first}`,
                        `${introdata.animated.first}<br />${introdatakor.animated.first}`,
                        `${introdata.animated.first}<br />${introdatakor.animated.first}`,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 25,
                      html: true,
                    }}
                  />
                </h2>
                <p className="mb-1x">{introdata.description}</p>
                <div className="intro_btn-action pb-5">
                  <Link to="/portfolio" className="text_2">
                    <div id="button_p" className="ac_btn btn">
                      My Portfolio
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Contact Me
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="portfolio-section">
          <h2>NEWS</h2>
          <div className="portfolio-list">
            {topPortfolio.map((item, index) => {
              // 이미지 비율 계산
              const ratio = useImageRatio(item.img);
              // 가로가 긴 경우와 세로가 긴 경우 스타일 분기 key로 index % 3을 사용하여 카드 스타일 변형
              const isWide = ratio >= 1;
              const aspect = isWide ? `${Math.round(ratio * 100)}/100` : `100/${Math.round((1 / ratio) * 100)}`;
              return (
                <div className={`portfolio-row-card card-variant-${index % 3}`} key={index}>
                  <div
                    className={`portfolio-row-image img-variant-${index % 3}`}
                    style={{
                      backgroundImage: `url(${item.img})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      aspectRatio: isWide ? `${ratio}/1` : `1/${1 / ratio}`,
                      minHeight: isWide ? "220px" : "320px",
                      maxHeight: isWide ? "380px" : "440px",
                    }}
                  ></div>
                  <div className="portfolio-row-content">
                    <h3>{item.title}</h3>
                    <p className="portfolio-date">{item.date}</p>
                    <p>{item.shortDescription}</p>
                    <button className="read-more-btn" onClick={() => openModal(item)}>
                      READ MORE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {modalOpen && modalData && (
          <div className="portfolio-modal-overlay" onClick={closeModal}>
            <div className="portfolio-modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={closeModal}>&times;</button>
              <img src={modalData.img} alt={modalData.title} className="modal-image" />
              <h2>{modalData.title}</h2>
              <p>{modalData.description}</p>
              {modalData.link && (
                <a href={modalData.link} target="_blank" rel="noopener noreferrer" className="modal-link">PDF 보기</a>
              )}
              {modalData.youtubeId && (
                <div className="modal-youtube">
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${modalData.youtubeId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </HelmetProvider>
  );
};
