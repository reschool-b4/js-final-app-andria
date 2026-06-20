document.addEventListener("DOMContentLoaded", () => { 
    const playToggleBtn = document.getElementById("playToggle");
    const playIcon = playToggleBtn.querySelector(".play-icon");
    const pauseIcon = playToggleBtn.querySelector(".pause-icon");
    const vinylRecord = document.querySelector(".vinyl-record");
    const waveform = document.querySelector(".waveform");
    const trackItems = document.querySelectorAll(".track-item");

    vinylRecord.classList.add("spinning");
    vinylRecord.style.animationPlayState = "paused";

    let isPlaying = false;

    function setVisualState(playing) {
        isPlaying = playing;
        if (playing) {
            playIcon.classList.add("hidden");
            pauseIcon.classList.remove("hidden");
            vinylRecord.style.animationPlayState = "running";
            waveform.classList.add("playing-bars");
        } else {
            playIcon.classList.remove("hidden");
            pauseIcon.classList.add("hidden");
            vinylRecord.style.animationPlayState = "paused";
            waveform.classList.remove("playing-bars");
        }
    }

    playToggleBtn.addEventListener("click", () => {
        setVisualState(!isPlaying);
    });

    trackItems.forEach(item => {
        item.addEventListener("click", () => {
            trackItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });

    const shopCards = document.querySelectorAll(".shop-card");
    shopCards.forEach(card => {
        const selectBtn = card.querySelector(".btn-select");
        selectBtn.addEventListener("click", () => {
            const isSelected = card.classList.toggle("selected");
            selectBtn.textContent = isSelected ? "SELECTED" : "SELECT";
        });
    });

    const contactForm = document.getElementById("contactForm");
    const contactSuccess = document.getElementById("contactSuccess");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        contactSuccess.classList.remove("hidden");
        contactForm.reset();
    });
});


const registerBtn = document.querySelector(".btn-outline");
const registerModal = document.getElementById("registerModal");
const modalClose = document.getElementById("modalClose");
const registerForm = document.getElementById("registerForm");
const passInput = document.getElementById("reg-pass");
const pass2Input = document.getElementById("reg-pass2");
const passGroup = document.getElementById("passGroup");
const switchToLogin = document.getElementById("switchToLogin");

function openModal() {
    registerModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    if (registerModal.classList.contains("hidden")) return;
    registerModal.classList.add("closing");
    setTimeout(() => {
        registerModal.classList.remove("closing");
        registerModal.classList.add("hidden");
        document.body.style.overflow = "";
        registerForm.reset();
        passGroup.classList.remove("error");
    }, 180);
}

registerBtn.addEventListener("click", openModal);

modalClose.addEventListener("click", closeModal);

registerModal.addEventListener("click", (e) => {
    if (e.target === registerModal) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !registerModal.classList.contains("hidden")) {
        closeModal();
    }
});

function passwordsMatch() {
    const matches = !pass2Input.value || passInput.value === pass2Input.value;
    passGroup.classList.toggle("error", !matches);
    return matches;
}

passInput.addEventListener("input", passwordsMatch);
pass2Input.addEventListener("input", passwordsMatch);

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!passwordsMatch()) return;

    const [name] = registerForm.querySelectorAll("input");
    alert(`Welcome, ${name.value}!`);
    closeModal();
});

switchToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Login coming soon!");
});