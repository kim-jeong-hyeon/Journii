import jidolHero from "./assets/images/jidol1.jpg";
import jidolHero2 from "./assets/images/jidol2.png";
import buka from "./assets/images/ba1.png";
import madang from "./assets/images/madang.png";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const logotext = "Jihyeon";
const meta = {
    title: "JiHyeon Kim",
    description: "I’m John Doe data scientist _ Full stack devloper,currently working in Berlin",
};

const introdata = {
    title: "Composer",
    animated: {
        first: "I’m Jihyeon Kim.",
        third: "I am a composer.",
    },
    description: "I'm on a journey to find happiness in this very moment",
    your_img_url: [jidolHero, jidolHero2],
    
};

const introdatakor = {
    animated: {
        first: "저는 김지현 입니다.",
    },
};

const dataabout = {
    title: "abit about my self",
    aboutme: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis dolor id ligula semper elementum feugiat pretium nulla. Nunc non commodo dolor. Nunc mollis dignissim facilisis. Morbi ut magna ultricies.",
};
const worktimeline = [{
        jobtitle: "Designer of week",
        where: "YAdfi",
        date: "2020",
    },
    {
        jobtitle: "Designer of week",
        where: "Jamalya",
        date: "2019",
    },
    {
        jobtitle: "Designer of week",
        where: "ALquds",
        date: "2019",
    },
];

const skills = [{
        name: "Python",
        value: 90,
    },
    {
        name: "Djano",
        value: 85,
    },
    {
        name: "Javascript",
        value: 80,
    },
    {
        name: "React",
        value: 60,
    },
    {
        name: "Jquery",
        value: 85,
    },
];

const services = [{
        title: "UI & UX Design",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl euismod urna bibendum sollicitudin.",
    },
    {
        title: "Mobile Apps",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl euismod urna bibendum sollicitudin.",
    },
    {
        title: "Wordpress Design",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisl euismod urna bibendum sollicitudin.",
    },
];

const dataportfolio = [{
        img: madang,
        title: "북어  최승호 시", // 제목 추가
        description: "이 시의 북어는 진실을 알고도 말하지 못하고, 꿈을 잃은 채 무기력하게 굴종하며 살아가는 현대인의 모습을 담고 있으며, 그 모습이 곧 우리 자신임을 말한다.",
        shortDescription: "시의 북어처럼, 꿈을 잃은 채 무기력하게 굴종하며 살아가는 현대인의 모습을 담고 있으며 그 모습이 곧 우리 자신임을 말한다.",
        link: process.env.PUBLIC_URL + "/assets/images/2019jakgokmadang.pdf",
        youtubeId: "nV0ucQ4jrQI",
        year: 2019,
        month: 10
    },
    {
        img: madang,
        title: "북어  최승호 시2", // 제목 추가
        description: "이 시의 북어는 진실을 알고도 말하지 못하고, 꿈을 잃은 채 무기력하게 굴종하며 살아가는 현대인의 모습을 담고 있으며, 그 모습이 곧 우리 자신임을 말한다.",
        shortDescription: "시의 북어처럼, 꿈을 잃은 채 무기력하게 굴종하며 살아가는 현대인의 모습을 담고 있으며 그 모습이 곧 우리 자신임을 말한다.",
        link: process.env.PUBLIC_URL + "/assets/images/2019jakgokmadang.pdf",
        youtubeId: "nV0ucQ4jrQI",
        year: 2019,
        month: 10
    },
        {
        img: buka,
        title: "북어  최승호 시2", // 제목 추가
        description: "이 시의 북어는 진실을 알고도 말하지 못하고, 꿈을 잃은 채 무기력하게 굴종하며 살아가는 현대인의 모습을 담고 있으며, 그 모습이 곧 우리 자신임을 말한다.",
        shortDescription: "시의 북어처럼, 꿈을 잃은 채 무기력하게 굴종하며 살아가는 현대인의 모습을 담고 있으며 그 모습이 곧 우리 자신임을 말한다.",
        link: process.env.PUBLIC_URL + "/assets/images/2019jakgokmadang.pdf",
        youtubeId: "nV0ucQ4jrQI",
        year: 2019,
        month: 10
    },
];

const contactConfig = {
    description: "Feel free to reach out to me on Instagram!",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
};

const socialprofils = {
    //chage to jidol instagram 
    youtube: "https://www.youtube.com/@%EC%A5%AC%EB%A5%B4%EB%8B%88",
    instagram: "https://www.instagram.com/jour__nii/",
    //linkedin: "https://linkedin.com",
};
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    skills,
    services,
    introdata,
    introdatakor,
    contactConfig,
    socialprofils,
    logotext,
};