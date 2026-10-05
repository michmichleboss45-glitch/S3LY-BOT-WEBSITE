/*
|--------------------------------------------------------------------------
| LIENS
|--------------------------------------------------------------------------
*/

const INVITE_URL =
    "https://discord.com/oauth2/authorize?client_id=1551036612396322857&permissions=8&integration_type=0&scope=bot+applications.commands";

const SUPPORT_URL =
    "https://discord.gg/CSFmuNVnar";


/*
|--------------------------------------------------------------------------
| COMMANDES
|--------------------------------------------------------------------------
*/

const commands = [

    {
        name: "/setup",
        description: "Configure ton serveur",
        category: "setup",
        icon: "⚙️"
    },

    {
        name: "/settings",
        description: "Gérer les paramètres",
        category: "setup",
        icon: "🔧"
    },

    {
        name: "/prefix",
        description: "Modifier le préfixe",
        category: "setup",
        icon: "⌨️"
    },

    {
        name: "/welcome",
        description: "Configurer les messages de bienvenue",
        category: "setup",
        icon: "👋"
    },

    {
        name: "/activity",
        description: "Gérer l'activité du bot",
        category: "setup",
        icon: "📡"
    },

    {
        name: "/hiberne",
        description: "Activer ou désactiver le mode veille",
        category: "setup",
        icon: "💤"
    },

    {
        name: "/clear",
        description: "Supprimer des messages",
        category: "moderation",
        icon: "🧹"
    },

    {
        name: "/antibot",
        description: "Gérer la protection AntiBot",
        category: "moderation",
        icon: "🤖"
    },

    {
        name: "/snipe",
        description: "Voir le dernier message supprimé",
        category: "moderation",
        icon: "🎯"
    },

    {
        name: "/afk",
        description: "Activer ton statut AFK",
        category: "moderation",
        icon: "💤"
    },

    {
        name: "/reglement",
        description: "Afficher le règlement",
        category: "moderation",
        icon: "📜"
    },

    {
        name: "/8ball",
        description: "Poser une question à la 8Ball",
        category: "fun",
        icon: "🎱"
    },

    {
        name: "/dice",
        description: "Lancer un dé",
        category: "fun",
        icon: "🎲"
    },

    {
        name: "/rank",
        description: "Afficher ton classement",
        category: "fun",
        icon: "🏆"
    },

    {
        name: "/myinfo",
        description: "Voir tes informations",
        category: "fun",
        icon: "👤"
    },

    {
        name: "/showuser",
        description: "Afficher les informations d'un membre",
        category: "fun",
        icon: "🔎"
    },

    {
        name: "/perf",
        description: "Voir les performances du bot",
        category: "fun",
        icon: "⚡"
    },

    {
        name: "/legit",
        description: "Vérifier une information",
        category: "fun",
        icon: "✅"
    },

    {
        name: "/emoji",
        description: "Afficher les emojis disponibles",
        category: "fun",
        icon: "😀"
    },

    {
        name: "/ticket",
        description: "Créer un ticket support",
        category: "support",
        icon: "🎫"
    },

    {
        name: "/cmd",
        description: "Afficher une commande",
        category: "support",
        icon: "📘"
    },

    {
        name: "/help",
        description: "Afficher l'aide",
        category: "support",
        icon: "❓"
    },

    {
        name: "/commands",
        description: "Ouvrir le menu des commandes",
        category: "support",
        icon: "📋"
    }

];


const categoryNames = {
    all: "Toutes les commandes",
    setup: "Configuration",
    moderation: "Modération",
    fun: "Fun & Utilitaires",
    support: "Support"
};


let activeCategory = "all";


/*
|--------------------------------------------------------------------------
| AFFICHAGE DES COMMANDES
|--------------------------------------------------------------------------
*/

const commandGrid =
    document.getElementById("commandGrid");

const commandSearch =
    document.getElementById("commandSearch");

const commandTitle =
    document.getElementById("commandTitle");


function renderCommands() {

    const search =
        commandSearch.value.trim().toLowerCase();


    const filtered =
        commands.filter(command => {

            const categoryMatch =
                activeCategory === "all" ||
                command.category === activeCategory;


            const searchMatch =
                !search ||
                command.name
                    .toLowerCase()
                    .includes(search) ||
                command.description
                    .toLowerCase()
                    .includes(search);


            return categoryMatch && searchMatch;

        });


    commandTitle.textContent =
        categoryNames[activeCategory];


    if (!filtered.length) {

        commandGrid.innerHTML = `
            <div style="
                padding:30px;
                color:#777789;
                font-size:11px;
            ">
                Aucune commande trouvée.
            </div>
        `;

        return;

    }


    commandGrid.innerHTML =
        filtered.map(command => {

            return `
                <div class="command-row">

                    <span class="command-icon">
                        ${command.icon}
                    </span>

                    <div>

                        <div class="command-name">
                            ${command.name}
                        </div>

                        <div class="command-desc">
                            ${command.description}
                        </div>

                    </div>

                </div>
            `;

        }).join("");

}


document
    .querySelectorAll(".command-tab")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".command-tab")
                    .forEach(item =>
                        item.classList.remove("active")
                    );


                button.classList.add("active");


                activeCategory =
                    button.dataset.category;


                renderCommands();

            }
        );

    });


commandSearch.addEventListener(
    "input",
    renderCommands
);


renderCommands();


/*
|--------------------------------------------------------------------------
| SETUP INTERACTIF
|--------------------------------------------------------------------------
*/

document
    .querySelectorAll(".setup-option")
    .forEach(option => {

        option.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".setup-option")
                    .forEach(item =>
                        item.classList.remove("selected")
                    );


                option.classList.add("selected");

            }
        );

    });


/*
|--------------------------------------------------------------------------
| INVITATION / SUPPORT
|--------------------------------------------------------------------------
*/

const toast =
    document.getElementById("toast");


function showToast(message) {

    if (!toast) return;


    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(
        window.toastTimeout
    );


    window.toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove("show");

            },
            3500
        );

}


function openLink(url) {

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/*
|--------------------------------------------------------------------------
| BOUTON INVITER LE BOT
|--------------------------------------------------------------------------
*/

document
    .querySelectorAll("[data-invite]")
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openLink(
                    INVITE_URL
                );

            }
        );

    });


/*
|--------------------------------------------------------------------------
| BOUTON SERVEUR SUPPORT
|--------------------------------------------------------------------------
*/

document
    .querySelectorAll("[data-support]")
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openLink(
                    SUPPORT_URL
                );

            }
        );

    });


/*
|--------------------------------------------------------------------------
| NAVBAR
|--------------------------------------------------------------------------
*/

const navbar =
    document.getElementById("navbar");


window.addEventListener(
    "scroll",
    () => {

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );

    },
    { passive: true }
);


/*
|--------------------------------------------------------------------------
| MENU MOBILE
|--------------------------------------------------------------------------
*/

const mobileMenu =
    document.getElementById("mobileMenu");


if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        () => {

            navbar.classList.toggle(
                "open"
            );

        }
    );

}


document
    .querySelectorAll("nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navbar.classList.remove(
                    "open"
                );

            }
        );

    });


/*
|--------------------------------------------------------------------------
| NAVIGATION ACTIVE
|--------------------------------------------------------------------------
*/

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        "nav a"
    );


const navObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;


                navLinks.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    );

                });

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach(section =>
    navObserver.observe(section)
);


/*
|--------------------------------------------------------------------------
| ANIMATIONS AU SCROLL
|--------------------------------------------------------------------------
*/

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;


                entry.target.classList.add(
                    "visible"
                );


                revealObserver.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: .12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(element =>
        revealObserver.observe(element)
    );


/*
|--------------------------------------------------------------------------
| RETOUR EN HAUT
|--------------------------------------------------------------------------
*/

const topButton =
    document.getElementById("topButton");


if (topButton) {

    window.addEventListener(
        "scroll",
        () => {

            topButton.classList.toggle(
                "show",
                window.scrollY > 500
            );

        },
        { passive: true }
    );


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/*
|--------------------------------------------------------------------------
| ANNÉE
|--------------------------------------------------------------------------
*/

const year =
    document.getElementById("year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}