const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');
    }, 1100);

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 1100);

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if(!link.classList.contains('active')){
            activePage();

            link.classList.add('active')

            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1100);
        }
    });
});

logoLink.addEventListener('click', () => {
    if(!navLinks[0].classList.contains('active')){
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1100);
    }
});

const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
     btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active')
     });
});

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
}

arrowRight.addEventListener('click', () => {
    if(index < 4){
        index++;
        arrowLeft.classList.remove('disabled');
    }
    else{
        index = 5;
        arrowRight.classList.add('disabled');
    }

    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if(index > 1){
        index--;
        arrowRight.classList.remove('disabled');
    }
    else{
        index = 0;
        arrowLeft.classList.add('disabled');
    }

    activePortfolio();
});

const form = document.querySelector('form');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const subject = document.getElementById('subject');
const mess = document.getElementById('message');

function validateForm() {
    if (!fullName.value || !email.value || !phone.value || !subject.value || !mess.value) {
        Swal.fire({
            title: "Error",
            text: "All fields are required!",
            icon: "error"
        });
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        Swal.fire({
            title: "Error",
            text: "Please enter a valid email address!",
            icon: "error"
        });
        return false;
    }
    return true;
}

function sendEmail() {
    const bodyMessage = `
        <strong>Full Name:</strong> ${fullName.value}<br>
        <strong>Email:</strong> ${email.value}<br>
        <strong>Phone Number:</strong> ${phone.value}<br>
        <strong>Message:</strong> ${mess.value}
    `;

    Email.send({
        Host: "smtp.elasticemail.com",  // Your SMTP host
        Username: "akashakash87928@gmail.com",  // Your SMTP username
        Password: "2947FA18FFF5EEBBF57FF738E8B7F8881E5C",  // Your SMTP API key or password
        To: "akashakash87928@gmail.com",  // Recipient's email
        From: "akashakash87928@gmail.com",  // Sender's verified email
        Subject: subject.value,
        Body: bodyMessage,
    }).then((message) => {
        if (message === "OK") {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "Failed to send message. Please try again.",
                icon: "error"
            });
        }
    }).catch((error) => {
        Swal.fire({
            title: "Error",
            text: `Something went wrong: ${error}`,
            icon: "error"
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) {
        sendEmail();
    }
});
