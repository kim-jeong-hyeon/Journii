import React, { useCallback, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Modal, Button, Spinner, Alert, Badge } from "react-bootstrap";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa"; // 상단에 추가
import { dataportfolio, meta } from "../../content_option";

/** ---------- 유틸 ---------- */
const isPdfLink = (link) => {
  if (!link || typeof link !== "string") return false;
  try {
    const u = new URL(link, window.location.origin);
    return u.pathname.toLowerCase().endsWith(".pdf");
  } catch {
    return link.toLowerCase().includes(".pdf");
  }
};

// YouTube ID 파서: URL, youtu.be, embed, query 포함 모두 지원
const getYoutubeId = (youtubeIdOrUrl) => {
  if (!youtubeIdOrUrl) return null;
  const str = String(youtubeIdOrUrl).trim();
  if (/^[\w-]{11}$/.test(str)) return str;
  try {
    const u = new URL(str);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v && /^[\w-]{11}$/.test(v)) return v;
      const m1 = u.pathname.match(/\/embed\/([\w-]{11})/);
      if (m1) return m1[1];
      const m2 = u.pathname.match(/\/shorts\/([\w-]{11})/);
      if (m2) return m2[1];
    }
    if (u.hostname === "youtu.be") {
      const m = u.pathname.match(/^\/([\w-]{11})/);
      if (m) return m[1];
    }
  } catch {
    const m = str.match(/^([\w-]{11})/);
    if (m) return m[1];
  }
  return null;
};

// ▶ 모달 내 재생용 임베드 URL 생성
const embedUrlFrom = (item) => {
  const id = getYoutubeId(item?.youtubeId) || getYoutubeId(item?.videoUrl);
  // 자동재생 원하면 autoplay=1&mute=1 추가 가능
  return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=0` : null;
};

/** ---------- 메인 ---------- */
export const Portfolio = () => {
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [frameError, setFrameError] = useState(null);
  const [favs, setFavs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("portfolio_favs") || "[]");
    } catch {
      return [];
    }
  });
  const [sortDesc, setSortDesc] = useState(true); // true: 최신순, false: 오래된순

  const handleViewProject = useCallback((item) => {
    if (!item?.link) return;
    if (!isPdfLink(item.link)) {
      window.open(item.link, "_blank", "noopener,noreferrer");
      return;
    }
    setCurrent(item);
    setLoading(true);
    setFrameError(null);
    setShowModal(true);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setCurrent(null);
    setLoading(false);
    setFrameError(null);
  };

  const isFav = current ? favs.some((f) => f.link === current.link) : false;

  const toggleSave = () => {
    if (!current) return;
    let next;
    if (isFav) next = favs.filter((f) => f.link !== current.link);
    else {
      next = [
        ...favs,
        {
          link: current.link,
          description: current.description,
          youtubeId: current.youtubeId,
          videoUrl: current.videoUrl,
          img: current.img,
          savedAt: Date.now(),
        },
      ];
    }
    setFavs(next);
    localStorage.setItem("portfolio_favs", JSON.stringify(next));
  };

  // 정렬 함수
  const sortedPortfolio = [...dataportfolio].sort((a, b) => {
    if (sortDesc) {
      if (b.year !== a.year) return b.year - a.year;
      return (b.month || 0) - (a.month || 0);
    } else {
      if (a.year !== b.year) return a.year - b.year;
      return (a.month || 0) - (b.month || 0);
    }
  });

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Portfolio | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg={8}>
            <h1 className="display-4 mb-4">Portfolio</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
          <Col lg={4} className="d-flex align-items-end justify-content-lg-end">
            <Button
              variant="outline-secondary"
              onClick={() => setSortDesc((prev) => !prev)}
              className="d-flex align-items-center"
              title={sortDesc ? "Latest" : "Oldest"}
            >
              {sortDesc ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
            </Button>
          </Col>
        </Row>

        <div className="mb-5 po_items_ho">
          {sortedPortfolio.map((data, i) => (
            <div key={i} className="po_item">
              <img src={data.img} alt={data.description || "portfolio thumbnail"} />
              <div className="content">
                <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{data.title} {data.year && data.month ? `${data.year}.${String(data.month).padStart(2, "0")}` : ""}</div>
                <p style={{ fontSize: "0.92rem", marginTop: 8 }}>
                  <br />
                  {data.description}
                </p>
                <button className="portfolio-btn" onClick={() => handleViewProject(data)}>
                  View Detail
                </button>
              </div>
            </div>
          ))}
        </div>

        <Modal
          show={showModal}
          onHide={handleClose}
          size="lg"
          centered
          fullscreen="md-down" /* 모바일 전체화면 */
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Description{" "}
              {current?.shortDescription && (
                <span className="text-muted" style={{ fontSize: 14, marginLeft: 8 }}>
                  <br />
                  {current.shortDescription}
                </span>
              )}
            </Modal.Title>
          </Modal.Header>

          {/* 스크롤 가능한 본문 */}
          <Modal.Body className="modal-body-scroll">
            {current && (
              <Row className="g-3">
                <Col xs={12}>
                  {/* 유튜브 임베드 */}
                  {embedUrlFrom(current) ? (
                    <div className="video-embed-16x9 card shadow-sm mb-4">
                      <iframe
                        src={embedUrlFrom(current)}
                        title="YouTube player"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="text-muted small">
                      연결된 영상이 없습니다. (<code>youtubeId</code> 또는 <code>videoUrl</code> 추가)
                    </div>
                  )}

                  {/* PDF 미리보기 */}
                  <div className="pdf-wrap">
                    {frameError && (
                      <Alert variant="danger" className="mb-3">
                        미리보기를 불러오지 못했습니다. (서버가 임베드를 막았을 수 있어요)
                        <div className="mt-2">
                          <a href={current.link} target="_blank" rel="noopener noreferrer">
                            새 탭에서 열기 / 다운로드
                          </a>
                        </div>
                      </Alert>
                    )}

                    {loading && !frameError && (
                      <div className="loading-layer">
                        <div className="d-flex align-items-center gap-2">
                          <Spinner animation="border" />
                          <span>불러오는 중...</span>
                        </div>
                      </div>
                    )}

                    {!frameError && (
                      <iframe
                        key={current.link}
                        src={`${current.link}#view=FitH`}
                        title="PDF preview"
                        className="pdf-iframe"
                        onLoad={() => setLoading(false)}
                        onError={() => {
                          setLoading(false);
                          setFrameError("iframe error");
                        }}
                        allow="fullscreen"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                </Col>
              </Row>
            )}
          </Modal.Body>

          {current && (
            <div className="mobile-actionbar d-lg-none">
              <div className="container-fluid px-3 py-2 d-grid">
                {current.link && (
                  <Button
                    size="lg"
                    variant="outline-primary"
                    as="a"
                    href={current.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    전체 보기
                  </Button>
                )}
              </div>
            </div>
          )}

          <Modal.Footer className="justify-content-end">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </HelmetProvider>
  );
};
