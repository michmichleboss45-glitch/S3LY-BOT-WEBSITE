/* =========================================
   S3LY_BOT WEBSITE V2
========================================= */


/* =========================================
   CONFIGURATION
========================================= */

const INVITE_URL =
    "https://discord.com/oauth2/authorize?client_id=1551036612396322857&permissions=8&integration_type=0&scope=bot+applications.commands";

const SUPPORT_URL =
    "https://discord.gg/CSFmuNVnar";

const PAYPAL_USERNAME =
    "NoxAspectYT";

const MIN_SUPPORT_AMOUNT =
    0.30;


/* =========================================
   COMMANDES
========================================= */

const commands = [

    {
        name: "/settings",
        description: "Affiche les paramètres du serveur.",
        category: "config",
        icon: "⚙️"
    },

    {
        name: "/prefix",
        description: "Gère les paramètres de préfixe.",
        category: "config",
        icon: "⌨️"
    },

    {
        name: "/welcome",
        description: "Configure le système de bienvenue.",
        category: "config",
        icon: "👋"
    },

    {
        name: "/activity",
        description: "Gère l'activité du bot.",
        category: "config",
        icon: "📊"
    },

    {
        name: "/hiberne",
        description: "Active ou désactive le mode veille.",
        category: "config",
        icon: "💤"
    },

    {
        name: "/emoji",
        description: "Gère les emojis du serveur.",
        category: "config",
        icon: "😀"
    },

    {
        name: "/clear",
        description: "Supprime plusieurs messages rapidement.",
        category: "moderation",
        icon: "🧹"
    },

    {
        name: "/antibot",
        description: "Renforce la protection contre les bots.",
        category: "moderation",
        icon: "🛡️"
    },

    {
        name: "/snipe",
        description: "Consulte le dernier message supprimé.",
        category: "moderation",
        icon: "🎯"
    },

    {
        name: "/reglement",
        description: "Affiche le règlement du serveur.",
        category: "moderation",
        icon: "📜"
    },

    {
        name: "/afk",
        description: "Active ton statut AFK.",
        category: "config",
        icon: "💤"
    },

    {
        name: "/8ball",
        description: "Pose une question à la boule magique.",
        category: "fun",
        icon: "🔮"
    },

    {
        name: "/dice",
        description: "Lance un dé.",
        category: "fun",
        icon: "🎲"
    },

    {
        name: "/rank",
        description: "Affiche ton classement.",
        category: "fun",
        icon: "🏆"
    },

    {
        name: "/myinfo",
        description: "Affiche tes informations Discord.",
        category: "fun",
        icon: "👤"
    },

    {
        name: "/showuser",
        description: "Affiche les informations d'un utilisateur.",
        category: "fun",
        icon: "🔎"
    },

    {
        name: "/perf",
        description: "Affiche les performances du bot.",
        category: "fun",
        icon: "⚡"
    },

    {
        name: "/legit",
        description: "Affiche les informations de légitimité.",
        category: "fun",
        icon: "✅"
    },

    {
        name: "/invite",
        description: "Obtiens le lien d'invitation du bot.",
        category: "support",
        icon: "🔗"
    },

    {
        name: "/ticket",
        description: "Crée un ticket de support privé.",
        category: "support",
        icon: "🎫"
    },

    {
        name: "/help",
        description: "Affiche l'aide de S3LY_BOT.",
        category: "support",
        icon: "❓"
    },

    {
        name: "/commands",
        description: "Affiche la liste des commandes.",
        category: "support",
        icon: "📋"
    },

    {
        name: "/menu",
        description: "Ouvre le menu principal du bot.",
        category: "config",
        icon: "📱"
    },

    {
        name: "/cmd",
        description: "Ouvre les outils créateur.",
        category: "fun",
        icon: "💻"
    },

    {
        name: "/uptime",
        description: "Affiche le temps de fonctionnement du bot.",
        category: "fun",
        icon: "⏱️"
    }

];


/* =========================================
   DOM
========================================= */

const navbar =
    document.getElementById("navbar");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");

const commandSearch =
    document.getElementById("commandSearch");

const commandsList =
    document.getElementById("commandsList");

const commandsEmpty =
    document.getElementById("commandsEmpty");

const commandTabs =
    document.querySelectorAll(".command-tab");

const backTop =
    document.getElementById("backTop");

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");

const currentYear =
    document.getElementById("currentYear");


/* =========================================
   ANNÉE
========================================= */

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================
   NAVBAR
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        navbar?.classList.add("scrolled");
    } else {
        navbar?.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
        backTop?.classList.add("visible");
    } else {
        backTop?.classList.remove("visible");
    }

});


/* =========================================
   MOBILE MENU
========================================= */

mobileMenuBtn?.addEventListener("click", () => {

    mobileMenu?.classList.toggle("open");

    mobileMenuBtn.textContent =
        mobileMenu?.classList.contains("open")
            ? "×"
            : "☰";

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu?.classList.remove("open");

            if (mobileMenuBtn) {
                mobileMenuBtn.textContent = "☰";
            }

        });

    });


/* =========================================
   REVEAL AU SCROLL
========================================= */

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach((element) => {

        revealObserver.observe(element);

    });


/* =========================================
   COMMANDES
========================================= */

let activeCategory = "all";


function renderCommands() {

    const search =
        commandSearch?.value
            .toLowerCase()
            .trim() || "";

    const filteredCommands =
        commands.filter((command) => {

            const categoryMatch =
                activeCategory === "all" ||
                command.category === activeCategory;

            const searchMatch =
                command.name
                    .toLowerCase()
                    .includes(search) ||
                command.description
                    .toLowerCase()
                    .includes(search);

            return categoryMatch && searchMatch;

        });


    if (!commandsList) {
        return;
    }


    commandsList.innerHTML = "";


    if (filteredCommands.length === 0) {

        commandsEmpty.style.display =
            "block";

        return;

    }


    commandsEmpty.style.display =
        "none";


    filteredCommands.forEach((command) => {

        const item =
            document.createElement("div");

        item.className =
            "command-item";


        const categoryNames = {

            config: "Configuration",

            moderation: "Modération",

            fun: "Fun",

            support: "Support"

        };


        item.innerHTML = `

            <div class="command-info">

                <div class="command-icon">
                    ${command.icon}
                </div>

                <div>

                    <div class="command-name">
                        ${command.name}
                    </div>

                    <div class="command-description">
                        ${command.description}
                    </div>

                </div>

            </div>

            <div class="command-category">
                ${categoryNames[command.category] || ""}
            </div>

        `;


        commandsList.appendChild(item);

    });

}


renderCommands();


commandSearch?.addEventListener(
    "input",
    renderCommands
);


commandTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        commandTabs.forEach((button) => {
            button.classList.remove("active");
        });

        tab.classList.add("active");

        activeCategory =
            tab.dataset.category || "all";

        renderCommands();

    });

});


/* =========================================
   PAYPAL / SOUTIEN
========================================= */

const supportButtons =
    document.querySelectorAll(
        ".support-amount"
    );

const customSupportInput =
    document.getElementById(
        "customSupportAmount"
    );

const customSupportButton =
    document.getElementById(
        "customSupportButton"
    );

const supportError =
    document.getElementById(
        "supportError"
    );


function showSupportError(message) {

    if (!supportError) {
        return;
    }

    supportError.textContent =
        message;

}


function clearSupportError() {

    if (supportError) {
        supportError.textContent = "";
    }

}


function goToPayPal(amount) {

    const numericAmount =
        Number(amount);


    if (
        !Number.isFinite(numericAmount) ||
        numericAmount < MIN_SUPPORT_AMOUNT
    ) {

        showSupportError(
            "Le montant minimum est de 0,30 €."
        );

        return;

    }


    clearSupportError();


    const formattedAmount =
        numericAmount.toFixed(2);


    const paypalUrl =
        `https://paypal.me/${PAYPAL_USERNAME}/${formattedAmount}`;


    window.open(
        paypalUrl,
        "_blank",
        "noopener,noreferrer"
    );

}


/* Montants prédéfinis */

supportButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const amount =
            button.dataset.amount;


        button.classList.add(
            "support-clicked"
        );


        setTimeout(() => {

            button.classList.remove(
                "support-clicked"
            );

        }, 300);


        goToPayPal(amount);

    });

});


/* Montant personnalisé */

customSupportButton?.addEventListener(
    "click",
    () => {

        if (!customSupportInput) {
            return;
        }


        const rawValue =
            customSupportInput.value
                .replace(",", ".")
                .trim();


        const amount =
            parseFloat(rawValue);


        if (
            !Number.isFinite(amount) ||
            amount < MIN_SUPPORT_AMOUNT
        ) {

            showSupportError(
                "Entre un montant d'au moins 0,30 €."
            );


            customSupportInput.focus();


            customSupportInput.classList.add(
                "support-input-error"
            );


            setTimeout(() => {

                customSupportInput.classList.remove(
                    "support-input-error"
                );

            }, 500);


            return;

        }


        clearSupportError();

        goToPayPal(amount);

    }
);


/* Entrée = continuer */

customSupportInput?.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            customSupportButton?.click();

        }

    }
);


/* =========================================
   BOUTONS DISCORD
========================================= */

document
    .querySelectorAll(
        `a[href="${INVITE_URL}"]`
    )
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                showToast(
                    "Ouverture de l'invitation Discord..."
                );

            }
        );

    });


document
    .querySelectorAll(
        `a[href="${SUPPORT_URL}"]`
    )
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                showToast(
                    "Ouverture du serveur support..."
                );

            }
        );

    });


/* =========================================
   TOAST
========================================= */

let toastTimeout;


function showToast(message) {

    if (!toast || !toastText) {
        return;
    }


    toastText.textContent =
        message;


    toast.classList.add(
        "visible"
    );


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "visible"
            );

        }, 3000);

}


/* =========================================
   BACK TO TOP
========================================= */

backTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   LIENS INTERNES
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const offset =
                    navbar?.offsetHeight || 76;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    offset -
                    10;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


/* =========================================
   NAVIGATION ACTIVE
========================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const id =
                    entry.target.id;


                navLinks.forEach((link) => {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute("href") ===
                        `#${id}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================
   PARALLAX LÉGER DU DASHBOARD
========================================= */

const dashboard =
    document.querySelector(".dashboard");


if (dashboard && window.innerWidth > 900) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 2;

            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 2;


            dashboard.style.transform =
                `rotateY(${-4 + x * 2}deg)
                 rotateX(${2 - y * 1.5}deg)`;

        }
    );

}